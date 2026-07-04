import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'

/**
 * Daily Revenue Report — runs via Vercel Cron at 9 AM PKT (4:00 UTC)
 * Sends each business owner a WhatsApp summary of yesterday's activity.
 */

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const secret = process.env.CRON_SECRET || ''
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    // Get all active businesses
    const businesses = await sql`SELECT * FROM businesses WHERE plan != 'cancelled'`

    if (!businesses || (businesses as any[]).length === 0) {
      return NextResponse.json({ status: 'no businesses' })
    }

    // Yesterday's date range (PKT = UTC+5)
    const now = new Date()
    const yesterdayStart = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    yesterdayStart.setHours(0, 0, 0, 0)
    const yesterdayEnd = new Date(yesterdayStart)
    yesterdayEnd.setHours(23, 59, 59, 999)

    let reportsSent = 0

    for (const biz of businesses as any[]) {
      const conversations = await sql`
        SELECT * FROM conversations
        WHERE business_id = ${biz.id}
        AND created_at >= ${yesterdayStart.toISOString()}::timestamptz
        AND created_at < ${yesterdayEnd.toISOString()}::timestamptz
      `

      const orders = await sql`
        SELECT * FROM orders
        WHERE business_id = ${biz.id}
        AND created_at >= ${yesterdayStart.toISOString()}::timestamptz
        AND created_at < ${yesterdayEnd.toISOString()}::timestamptz
      `

      const convArr = conversations as any[]
      const ordArr = orders as any[]

      const totalInquiries = convArr.length
      const totalOrders = ordArr.length
      const codVerified = ordArr.filter((o) => o.cod_verified).length
      const totalRevenue = ordArr.reduce((sum, o) => sum + Number(o.total), 0)
      const abandonedCount = convArr.filter((c) => c.status === 'abandoned').length

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
