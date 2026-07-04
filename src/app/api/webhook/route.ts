import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { generateReply, buildSystemPrompt, extractOrder, type ChatMessage } from '@/lib/ai-agent'
import { sendTextMessage } from '@/lib/whatsapp'

/**
 * WhatsApp Business Cloud API Webhook
 * GET  — verification challenge (Meta setup)
 * POST — incoming messages
 */

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'sellbot_verify_2026'

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Webhook] Verified successfully')
    return new NextResponse(challenge, { status: 200 })
  }

  console.error('[Webhook] Verification failed', { mode, token })
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    // Verify signature — skip if no signature header present (local testing)
    const signature = req.headers.get('x-hub-signature-256') || ''
    const appSecret = process.env.WHATSAPP_APP_SECRET || ''
    if (appSecret && signature) {
      const crypto = await import('crypto')
      const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
      if (expected.length !== signature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
        console.error('[Webhook] Invalid signature')
        return NextResponse.json({ error: 'invalid signature' }, { status: 403 })
      }
    }

    const body = JSON.parse(rawBody)

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' })
    }

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const messages = change.value?.messages || []
        const metadata = change.value?.metadata || {}
        const businessPhoneNumberId = metadata.phone_number_id || ''

        for (const msg of messages) {
          const customerPhone = msg.from
          const customerName = change.value?.contacts?.find((c: any) => c.wa_id === customerPhone)?.profile?.name || null

          if (msg.type !== 'text') {
            await sendTextMessage(customerPhone, 'Assalam o Alaikum! Hum abhi text messages handle kar sakte hain. Apna sawal text me likhein 🙏', businessPhoneNumberId)
            continue
          }

          const customerText = msg.text?.body || ''
          console.log(`[Webhook] Message from ${customerPhone}: ${customerText.substring(0, 50)}...`)

          // Find business by phone_number_id
          const businesses = await sql`SELECT * FROM businesses WHERE phone_number_id = ${businessPhoneNumberId} LIMIT 1`
          const business = (businesses as any[])[0]

          if (!business) {
            console.error('[Webhook] No business found for phone_number_id:', businessPhoneNumberId)
            continue
          }

          // Check trial expiry
          if (business.trial_ends_at && new Date(business.trial_ends_at) < new Date() && business.plan === 'trial') {
            await sendTextMessage(customerPhone, 'Aapka free trial khatam ho gaya hai. Owner se contact karein. 🙏', businessPhoneNumberId)
            continue
          }

          // Find or create conversation
          let conversations = await sql`
            SELECT * FROM conversations
            WHERE business_id = ${business.id} AND customer_phone = ${customerPhone}
            ORDER BY created_at DESC LIMIT 1
          `
          let conversation = (conversations as any[])[0]

          if (!conversation) {
            const newConvs = await sql`
              INSERT INTO conversations (business_id, customer_phone, customer_name, status)
              VALUES (${business.id}, ${customerPhone}, ${customerName}, 'active')
              RETURNING *
            `
            conversation = (newConvs as any[])[0]
          } else {
            // Reactivate if was abandoned
            if (conversation.status === 'abandoned') {
              await sql`UPDATE conversations SET status = 'active' WHERE id = ${conversation.id}`
              conversation.status = 'active'
            }
          }

          if (!conversation) continue

          // Store customer message + update last_message_at
          await sql`
            INSERT INTO messages (conversation_id, role, content)
            VALUES (${conversation.id}, 'customer', ${customerText})
          `
          await sql`UPDATE conversations SET last_message_at = now() WHERE id = ${conversation.id}`

          // Update customer name if we got it
          if (customerName && !conversation.customer_name) {
            await sql`UPDATE conversations SET customer_name = ${customerName} WHERE id = ${conversation.id}`
          }

          // COD verification: check if customer is confirming a pending order
          const confirmTriggers = ['yes', 'haan', 'confirm', 'kar do', 'kar de', 'ok', 'theek hai', 'set hai', 'confirm hai']
          if (confirmTriggers.some((t) => customerText.toLowerCase().trim().includes(t))) {
            const pendingOrder = await sql`
              SELECT * FROM orders
              WHERE conversation_id = ${conversation.id} AND cod_verified = false AND status = 'pending'
              ORDER BY created_at DESC LIMIT 1
            `
            const order = (pendingOrder as any[])[0]
            if (order) {
              await sql`UPDATE orders SET cod_verified = true, status = 'confirmed' WHERE id = ${order.id}`
              await sql`UPDATE conversations SET status = 'order_placed' WHERE id = ${conversation.id}`

              const itemsSummary = Array.isArray(order.items)
                ? order.items.map((it: any) => `${it.qty}x ${it.name}${it.size ? ` (${it.size})` : ''}`).join(', ')
                : 'items'

              const confirmMsg = `✅ Order Confirmed!\n\n📦 ${itemsSummary}\n💰 Total: PKR ${Number(order.total).toLocaleString()}\n💵 Payment: COD\n\nAapka order ${business.business_name} ko bhej diya gaya hai. Owner thodi der me dispatch details bhejenge. Shukriya! 🌟`
              await sendTextMessage(customerPhone, confirmMsg, businessPhoneNumberId)
              await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${confirmMsg})`

              // Notify owner
              if (business.whatsapp_number && businessPhoneNumberId) {
                const ownerPhone = business.whatsapp_number.replace(/\D/g, '')
                const ownerMsg = `🔔 Naya Order!\n\nCustomer: ${customerName || customerPhone}\n📦 ${itemsSummary}\n💰 PKR ${Number(order.total).toLocaleString()}\n💵 COD Verified ✅\n\nOrder ID: ${order.id}`
                await sendTextMessage(ownerPhone, ownerMsg, businessPhoneNumberId)
              }
              continue
            }
          }

          // Fetch conversation history (last 10 messages)
          const history = await sql`
            SELECT role, content FROM messages
            WHERE conversation_id = ${conversation.id}
            ORDER BY created_at DESC LIMIT 10
          `

          const chatMessages: ChatMessage[] = (history as any[])
            .reverse()
            .map((m: any) => ({
              role: m.role === 'customer' ? 'user' : 'assistant',
              content: m.content,
            }))

          // Fetch products for context
          const products = await sql`SELECT * FROM products WHERE business_id = ${business.id}`

          // Build system prompt
          const systemPrompt = buildSystemPrompt({
            business_name: business.business_name,
            industry: business.industry,
            owner_name: business.owner_name,
            products: (products as any[]).map((p: any) => ({
              name: p.name,
              price: Number(p.price),
              description: p.description || '',
              sizes: p.sizes,
              in_stock: p.in_stock,
            })),
          })

          // Generate AI reply
          const aiReply = await generateReply(chatMessages, systemPrompt)

          if (!aiReply) {
            const fallbackReply = 'Assalam o Alaikum! Aapka message mil gaya. Owner thodi der me reply karenge. 🙏'
            await sendTextMessage(customerPhone, fallbackReply, businessPhoneNumberId)
            await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${fallbackReply})`
            continue
          }

          // Send AI reply
          await sendTextMessage(customerPhone, aiReply, businessPhoneNumberId)
          await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${aiReply})`

          // Try to extract order from conversation (after 3+ messages)
          if (chatMessages.length >= 3) {
            const orderData = await extractOrder(
              [...chatMessages, { role: 'assistant', content: aiReply }],
              (products as any[]).map((p: any) => ({ id: p.id, name: p.name, price: Number(p.price) }))
            )

            if (orderData && orderData.items?.length > 0) {
              const itemsJson = JSON.stringify(orderData.items)
              const address = orderData.customer_address || null

              await sql`
                INSERT INTO orders (conversation_id, business_id, items, total, customer_phone, customer_address, payment_method, cod_verified, status)
                VALUES (${conversation.id}, ${business.id}, ${itemsJson}::jsonb, ${orderData.total}, ${customerPhone}, ${address}, 'cod', false, 'pending')
              `

              await sql`UPDATE conversations SET status = 'order_placed' WHERE id = ${conversation.id}`
              console.log(`[Webhook] Order extracted: PKR ${orderData.total} from ${customerPhone}`)

              // Send COD verification request to customer
              const verifyMsg = `📦 Aapka order ready hai!\n\n${orderData.items.map((it: any) => `• ${it.qty}x ${it.name}${it.size ? ` (${it.size})` : ''} — PKR ${(it.qty * it.price).toLocaleString()}`).join('\n')}\n\n💰 Total: PKR ${orderData.total.toLocaleString()}\n💵 Payment: Cash on Delivery\n\nOrder confirm karne ke liye "YES" reply karein. 24 ghante me reply na aane pe order cancel ho jayega.`
              await sendTextMessage(customerPhone, verifyMsg, businessPhoneNumberId)
              await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${verifyMsg})`
            }
          }

          // Abandoned inquiry detection (lighter triggers — only mark, don't follow up yet)
          const abandonTriggers = ['soch', 'bata deta', 'think', 'later', 'baad me', 'confirm nahi']
          if (abandonTriggers.some((t) => customerText.toLowerCase().includes(t))) {
            await sql`UPDATE conversations SET status = 'abandoned' WHERE id = ${conversation.id}`
            console.log(`[Webhook] Conversation marked abandoned for follow-up`)
          }
        }
      }
    }

    return NextResponse.json({ status: 'processed' })
  } catch (e: any) {
    console.error('[Webhook] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
