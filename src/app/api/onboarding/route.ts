import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { generateAccessToken, authCookieHeader } from '@/lib/auth'

/**
 * Onboarding API — creates business + products, sets auth cookie
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { business_name, owner_name, whatsapp_number, industry, products } = body

    if (!business_name || !owner_name || !whatsapp_number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const accessToken = generateAccessToken()

    // Create business with access token + 14-day trial
    const bizResult = await sql`
      INSERT INTO businesses (business_name, owner_name, whatsapp_number, industry, plan, access_token, trial_ends_at)
      VALUES (${business_name}, ${owner_name}, ${whatsapp_number}, ${industry || 'general'}, 'trial', ${accessToken}, now() + interval '14 days')
      RETURNING *
    `
    const business = (bizResult as any[])[0]

    if (!business) {
      console.error('[Onboarding] Business creation failed')
      return NextResponse.json({ error: 'Business creation failed' }, { status: 500 })
    }

    // Create products
    if (products && products.length > 0) {
      for (const p of products) {
        const sizes = p.sizes || null
        const desc = p.description || ''
        await sql`
          INSERT INTO products (business_id, name, price, description, sizes, in_stock)
          VALUES (${business.id}, ${p.name}, ${p.price}, ${desc}, ${sizes}, ${p.in_stock !== false})
        `
      }
    }

    const res = NextResponse.json({ business_id: business.id, access_token: accessToken, status: 'ok' })
    res.headers.set('Set-Cookie', authCookieHeader(accessToken))
    return res
  } catch (e: any) {
    console.error('[Onboarding] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
