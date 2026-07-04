import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
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

    // Verify signature
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

    // Meta webhook structure
    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' })
    }

    // Process each entry
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        const messages = change.value?.messages || []
        const metadata = change.value?.metadata || {}
        const businessPhoneNumber = metadata.phone_number_id || ''

        for (const msg of messages) {
          if (msg.type !== 'text') {
            // Non-text message — reply with helpful message
            await sendTextMessage(msg.from, 'Assalam o Alaikum! Hum abhi text messages handle kar sakte hain. Apna sawal text me likhein 🙏', businessPhoneNumber)
            continue
          }

          const customerPhone = msg.from
          const customerText = msg.text?.body || ''
          const customerName = change.value?.contacts?.find((c: any) => c.wa_id === customerPhone)?.profile?.name || null

          console.log(`[Webhook] Message from ${customerPhone}: ${customerText.substring(0, 50)}...`)

          // Find business by phone number ID
          const { data: business } = await supabaseAdmin
            .from('businesses')
            .select('*')
            .eq('phone_number_id', businessPhoneNumber)
            .single()

          if (!business) {
            console.error('[Webhook] No business found for phone_number_id:', businessPhoneNumber)
            continue
          }

          // Find or create conversation
          let { data: conversation } = await supabaseAdmin
            .from('conversations')
            .select('*')
            .eq('business_id', business.id)
            .eq('customer_phone', customerPhone)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          if (!conversation) {
            const { data: newConv } = await supabaseAdmin
              .from('conversations')
              .insert({
                business_id: business.id,
                customer_phone: customerPhone,
                customer_name: customerName,
                status: 'active',
              })
              .select()
              .single()
            conversation = newConv
          }

          if (!conversation) continue

          // Store customer message
          await supabaseAdmin.from('messages').insert({
            conversation_id: conversation.id,
            role: 'customer',
            content: customerText,
          })

          // Fetch conversation history (last 10 messages)
          const { data: history } = await supabaseAdmin
            .from('messages')
            .select('role, content')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: false })
            .limit(10)

          const chatMessages: ChatMessage[] = (history || [])
            .reverse()
            .map((m: any) => ({
              role: m.role === 'customer' ? 'user' : 'assistant',
              content: m.content,
            }))

          // Fetch products for context
          const { data: products } = await supabaseAdmin
            .from('products')
            .select('*')
            .eq('business_id', business.id)

          // Build system prompt with business context
          const systemPrompt = buildSystemPrompt({
            business_name: business.business_name,
            industry: business.industry,
            owner_name: business.owner_name,
            products: (products || []).map((p: any) => ({
              name: p.name,
              price: p.price,
              description: p.description,
              sizes: p.sizes,
              in_stock: p.in_stock,
            })),
          })

          // Generate AI reply
          const aiReply = await generateReply(chatMessages, systemPrompt)

          if (!aiReply) {
            // Fallback — don't leave customer hanging
            const fallbackReply = 'Assalam o Alaikum! Aapka message mil gaya. Owner thodi der me reply karenge. 🙏'
            await sendTextMessage(customerPhone, fallbackReply, businessPhoneNumber)
            await supabaseAdmin.from('messages').insert({
              conversation_id: conversation.id,
              role: 'agent',
              content: fallbackReply,
            })
            continue
          }

          // Send AI reply
          await sendTextMessage(customerPhone, aiReply, businessPhoneNumber)

          // Store agent message
          await supabaseAdmin.from('messages').insert({
            conversation_id: conversation.id,
            role: 'agent',
            content: aiReply,
          })

          // Try to extract order from conversation
          if (chatMessages.length >= 3) {
            const orderData = await extractOrder(
              [...chatMessages, { role: 'assistant', content: aiReply }],
              (products || []).map((p: any) => ({ id: p.id, name: p.name, price: p.price }))
            )

            if (orderData && orderData.items?.length > 0) {
              // Store order
              await supabaseAdmin.from('orders').insert({
                conversation_id: conversation.id,
                business_id: business.id,
                items: orderData.items,
                total: orderData.total,
                customer_phone: customerPhone,
                customer_address: orderData.customer_address || null,
                payment_method: 'cod',
                cod_verified: false,
                status: 'pending',
              })

              // Update conversation status
              await supabaseAdmin
                .from('conversations')
                .update({ status: 'order_placed' })
                .eq('id', conversation.id)

              console.log(`[Webhook] Order extracted: PKR ${orderData.total} from ${customerPhone}`)
            }
          }

          // Abandoned inquiry detection → schedule follow-up (simplified: check for "sochta/bataungi/think")
          const abandonTriggers = ['soch', 'bata', 'think', 'later', 'baad', 'confirm nahi']
          if (abandonTriggers.some((t) => customerText.toLowerCase().includes(t))) {
            // Mark as abandoned for follow-up
            await supabaseAdmin
              .from('conversations')
              .update({ status: 'abandoned' })
              .eq('id', conversation.id)
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
