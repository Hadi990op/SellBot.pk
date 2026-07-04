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

    // Verify signature (optional — only if app secret configured)
    const signature = req.headers.get('x-hub-signature-256') || ''
    const appSecret = process.env.WHATSAPP_APP_SECRET || ''
    if (appSecret) {
      const crypto = require('crypto')
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
          if (msg.type !== 'text') {
            await sendTextMessage(msg.from, 'Assalam o Alaikum! Hum abhi text messages handle kar sakte hain. Apna sawal text me likhein 🙏', businessPhoneNumberId)
            continue
          }

          const customerPhone = msg.from
          const customerText = msg.text?.body || ''
          const customerName = change.value?.contacts?.find((c: any) => c.wa_id === customerPhone)?.profile?.name || null

          console.log(`[Webhook] Message from ${customerPhone}: ${customerText.substring(0, 50)}...`)

          // Find business by phone_number_id
          const businesses = await sql`SELECT * FROM businesses WHERE phone_number_id = ${businessPhoneNumberId} LIMIT 1`
          const business = (businesses as any[])[0]

          if (!business) {
            console.error('[Webhook] No business found for phone_number_id:', businessPhoneNumberId)
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
          }

          if (!conversation) continue

          // Store customer message
          await sql`
            INSERT INTO messages (conversation_id, role, content)
            VALUES (${conversation.id}, 'customer', ${customerText})
          `

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
            await sql`
              INSERT INTO messages (conversation_id, role, content)
              VALUES (${conversation.id}, 'agent', ${fallbackReply})
            `
            continue
          }

          // Send AI reply
          await sendTextMessage(customerPhone, aiReply, businessPhoneNumberId)

          // Store agent message
          await sql`
            INSERT INTO messages (conversation_id, role, content)
            VALUES (${conversation.id}, 'agent', ${aiReply})
          `

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
            }
          }

          // Abandoned inquiry detection
          const abandonTriggers = ['soch', 'bata', 'think', 'later', 'baad', 'confirm nahi']
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
