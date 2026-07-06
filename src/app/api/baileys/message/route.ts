import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { generateReply, buildSystemPrompt, extractOrder, type ChatMessage } from '@/lib/ai-agent'

/**
 * Baileys incoming message handler
 * Called by WhatsApp Service (port 3002) when a new message arrives.
 * 
 * POST /api/baileys/message
 * Body: { from, senderName, text }
 * Returns: { reply: "AI generated reply" }
 */

export async function POST(req: NextRequest) {
  try {
    const { from, senderName, text } = await req.json()

    if (!from || !text) {
      return NextResponse.json({ error: 'from and text required' }, { status: 400 })
    }

    console.log(`[Baileys API] Message from ${from} (${senderName}): ${text.substring(0, 50)}...`)

    // Find business by WhatsApp number — match the connected bot's number
    // The WhatsApp service is connected to ONE number — find the business that owns it
    const businesses = await sql`
      SELECT * FROM businesses 
      WHERE whatsapp_number IS NOT NULL 
      ORDER BY created_at DESC 
      LIMIT 1
    `
    const business = (businesses as any[])[0]

    if (!business) {
      console.error('[Baileys API] No business found')
      return NextResponse.json({ reply: 'Assalam o Alaikum! Abhi koi business register nahi hai. 🙏' })
    }

    // Check trial expiry
    if (business.trial_ends_at && new Date(business.trial_ends_at) < new Date() && business.plan === 'trial') {
      return NextResponse.json({ reply: 'Aapka free trial khatam ho gaya hai. Owner se contact karein. 🙏' })
    }

    // Find or create conversation
    let conversations = await sql`
      SELECT * FROM conversations
      WHERE business_id = ${business.id} AND customer_phone = ${from}
      ORDER BY created_at DESC LIMIT 1
    `
    let conversation = (conversations as any[])[0]

    if (!conversation) {
      const newConvs = await sql`
        INSERT INTO conversations (business_id, customer_phone, customer_name, status)
        VALUES (${business.id}, ${from}, ${senderName}, 'active')
        RETURNING *
      `
      conversation = (newConvs as any[])[0]
    } else {
      if (conversation.status === 'abandoned') {
        await sql`UPDATE conversations SET status = 'active' WHERE id = ${conversation.id}`
        conversation.status = 'active'
      }
    }

    if (!conversation) {
      return NextResponse.json({ reply: null })
    }

    // Store customer message + update last_message_at
    await sql`
      INSERT INTO messages (conversation_id, role, content)
      VALUES (${conversation.id}, 'customer', ${text})
    `
    await sql`UPDATE conversations SET last_message_at = now() WHERE id = ${conversation.id}`

    // Update customer name if we got it
    if (senderName && senderName !== from && !conversation.customer_name) {
      await sql`UPDATE conversations SET customer_name = ${senderName} WHERE id = ${conversation.id}`
    }

    // COD verification: check if customer is confirming a pending order
    const confirmTriggers = ['yes', 'haan', 'confirm', 'kar do', 'kar de', 'ok', 'theek hai', 'set hai', 'confirm hai']
    if (confirmTriggers.some((t) => text.toLowerCase().trim().includes(t))) {
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
        await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${confirmMsg})`

        // Notify owner via WhatsApp service
        if (business.whatsapp_number) {
          const ownerMsg = `🔔 Naya Order!\n\nCustomer: ${senderName || from}\n📦 ${itemsSummary}\n💰 PKR ${Number(order.total).toLocaleString()}\n💵 COD Verified ✅\n\nOrder ID: ${order.id}`
          try {
            await fetch('http://127.0.0.1:3002/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ to: business.whatsapp_number, text: ownerMsg }),
            })
          } catch (e) {
            console.error('[Baileys API] Owner notify failed:', e)
          }
        }

        return NextResponse.json({ reply: confirmMsg })
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
      await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${fallbackReply})`
      return NextResponse.json({ reply: fallbackReply })
    }

    // Store AI reply
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
          VALUES (${conversation.id}, ${business.id}, ${itemsJson}::jsonb, ${orderData.total}, ${from}, ${address}, 'cod', false, 'pending')
        `

        await sql`UPDATE conversations SET status = 'order_placed' WHERE id = ${conversation.id}`
        console.log(`[Baileys API] Order extracted: PKR ${orderData.total} from ${from}`)

        // Append COD verification request to the reply
        const verifyMsg = `\n\n📦 Aapka order ready hai!\n${orderData.items.map((it: any) => `• ${it.qty}x ${it.name}${it.size ? ` (${it.size})` : ''} — PKR ${(it.qty * it.price).toLocaleString()}`).join('\n')}\n💰 Total: PKR ${orderData.total.toLocaleString()}\n💵 Payment: Cash on Delivery\n\nOrder confirm karne ke liye "YES" reply karein. 24 ghante me reply na aane pe order cancel ho jayega.`
        
        const fullReply = aiReply + verifyMsg
        await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conversation.id}, 'agent', ${verifyMsg})`
        return NextResponse.json({ reply: fullReply })
      }
    }

    // Abandoned inquiry detection
    const abandonTriggers = ['soch', 'bata deta', 'think', 'later', 'baad me', 'confirm nahi']
    if (abandonTriggers.some((t) => text.toLowerCase().includes(t))) {
      await sql`UPDATE conversations SET status = 'abandoned' WHERE id = ${conversation.id}`
    }

    return NextResponse.json({ reply: aiReply })
  } catch (e: any) {
    console.error('[Baileys API] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
