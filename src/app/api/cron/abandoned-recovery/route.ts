import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'

/**
 * Abandoned Recovery Cron — runs every 30 minutes via VM cron.
 * Finds conversations marked 'abandoned' that haven't had a follow-up yet
 * and sends a smart recovery message after 4+ hours of silence.
 */

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const secret = process.env.CRON_SECRET || ''
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    // Find abandoned conversations with no follow-up in last 4 hours
    // and last message was > 4 hours ago
    const abandoned = await sql`
      SELECT c.*, b.business_name, b.phone_number_id, b.whatsapp_number
      FROM conversations c
      JOIN businesses b ON c.business_id = b.id
      WHERE c.status = 'abandoned'
      AND c.last_followup_at IS NULL
      AND c.last_message_at < now() - interval '4 hours'
      AND b.phone_number_id IS NOT NULL
      LIMIT 50
    `

    let recovered = 0

    for (const conv of abandoned as any[]) {
      const recoveryMsg = `Assalam o Alaikum! Kya aapne order ke baare me socha? 🤔

Hum abhi available hain! Agar koi sawal hai ya order karna chahte hain, bas reply karein. Hum aapki madad karenge. ✨

— ${conv.business_name}`

      const sent = await sendTextMessage(conv.customer_phone, recoveryMsg, conv.phone_number_id)

      if (sent) {
        await sql`UPDATE conversations SET last_followup_at = now() WHERE id = ${conv.id}`
        await sql`INSERT INTO messages (conversation_id, role, content) VALUES (${conv.id}, 'agent', ${recoveryMsg})`
        recovered++
      }
    }

    return NextResponse.json({ status: 'ok', recovered, checked: (abandoned as any[]).length })
  } catch (e: any) {
    console.error('[Abandoned Recovery] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
