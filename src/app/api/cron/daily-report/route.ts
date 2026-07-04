import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'

/**
 * Daily Revenue Report — runs via Vercel Cron at 9 AM PKT (4:00 UTC)
 * Sends each business owner a WhatsApp summary of yesterday's activity.
 *
 * Vercel cron config in vercel.json:
 * { "crons": [{ "path": "/api/cron/daily-report", "schedule": "0 4 * * *" }] }
 *
 * Protected by CRON_SECRET — Vercel sends it as Authorization: Bearer <secret>
 */

export async function GET(req: NextRequest) {
  // Verify cron secret
  const auth = req.headers.get('authorization') || ''
  const secret = process.env.CRON_SECRET || ''
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    // Get all active businesses
    const { data: businesses } = await supabaseAdmin
      .from('businesses')
      .select('*')
      .neq('plan', 'cancelled')

    if (!businesses || businesses.length === 0) {
      return NextResponse.json({ status: 'no businesses' })
    }

    // Yesterday's date range (PKT = UTC+5)
    const now = new Date()
    const yesterdayStart = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    yesterdayStart.setHours(0, 0, 0, 0)
    const yesterdayEnd = new Date(yesterdayStart)
    yesterdayEnd.setHours(23, 59, 59, 999)

    let reportsSent = 0

    for (const biz of businesses) {
      // Get yesterday's conversations
      const { data: conversations } = await supabaseAdmin
        .from('conversations')
        .select('*')
        .eq('business_id', biz.id)
        .gte('created_at', yesterdayStart.toISOString())
        .lt('created_at', yesterdayEnd.toISOString())

      // Get yesterday's orders
      const { data: orders } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('business_id', biz.id)
        .gte('created_at', yesterdayStart.toISOString())
        .lt('created_at', yesterdayEnd.toISOString())

      const totalInquiries = conversations?.length || 0
      const totalOrders = orders?.length || 0
      const codVerified = orders?.filter((o: any) => o.cod_verified).length || 0
      const totalRevenue = orders?.reduce((sum: number, o: any) => sum + Number(o.total), 0) || 0
      const abandonedCount = conversations?.filter((c: any) => c.status === 'abandoned').length || 0

      // Build report message
      const report = `🌅 ${biz.business_name} — Daily Report

📊 Kal ki activity:
• Total inquiries: ${totalInquiries}
• Orders confirm: ${totalOrders}
• COD verified: ${codVerified}
• Abandoned (follow-up needed): ${abandonedCount}
💰 Potential revenue: PKR ${totalRevenue.toLocaleString()}

${totalInquiries === 0 ? 'Kal koi inquiry nahi aayi. Marketing pe focus karein! 📈' : ''}
${abandonedCount > 0 ? '⚠️ ' + abandonedCount + ' customer(s) ne order confirm nahi kiya. Follow-up zaroori hai!' : ''}
${totalRevenue > 0 ? '🎉 Mubarak! Aap so rahe the, SellBot ne kaam kiya.' : ''}

— SellBot.pk 🤖`

      // Send to owner's WhatsApp number (the business WhatsApp number)
      const ownerPhone = biz.whatsapp_number?.replace(/\D/g, '')
      if (ownerPhone && biz.phone_number_id) {
        await sendTextMessage(ownerPhone, report, biz.phone_number_id)
        reportsSent++
      }
    }

    return NextResponse.json({ status: 'ok', reportsSent })
  } catch (e: any) {
    console.error('[Daily Report] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
