import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { getBusinessFromRequest } from '@/lib/auth'

/**
 * Business API — update phone_number_id (WhatsApp connection step)
 */

export async function POST(req: NextRequest) {
  const business = await getBusinessFromRequest(req as any)
  if (!business) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const phoneNumberId = formData.get('phone_number_id') as string

    if (!phoneNumberId) {
      return NextResponse.json({ error: 'phone_number_id required' }, { status: 400 })
    }

    await sql`UPDATE businesses SET phone_number_id = ${phoneNumberId} WHERE id = ${business.id}`

    return NextResponse.redirect(new URL('/dashboard/whatsapp-setup?updated=1', req.url))
  } catch (e: any) {
    console.error('[Business Update] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
