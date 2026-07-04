import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * Onboarding API — creates business + products
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { business_name, owner_name, whatsapp_number, industry, products } = body

    if (!business_name || !owner_name || !whatsapp_number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create business
    const { data: business, error: bizError } = await supabaseAdmin
      .from('businesses')
      .insert({
        business_name,
        owner_name,
        whatsapp_number,
        industry: industry || 'general',
        plan: 'trial',
      })
      .select()
      .single()

    if (bizError || !business) {
      console.error('[Onboarding] Business creation failed:', bizError)
      return NextResponse.json({ error: 'Business creation failed' }, { status: 500 })
    }

    // Create products
    if (products && products.length > 0) {
      const productRows = products.map((p: any) => ({
        business_id: business.id,
        name: p.name,
        price: p.price,
        description: p.description || '',
        sizes: p.sizes || null,
        in_stock: p.in_stock !== false,
      }))

      const { error: prodError } = await supabaseAdmin.from('products').insert(productRows)
      if (prodError) {
        console.error('[Onboarding] Product creation failed:', prodError)
      }
    }

    return NextResponse.json({ business_id: business.id, status: 'ok' })
  } catch (e: any) {
    console.error('[Onboarding] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
