import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { getBusinessFromRequest } from '@/lib/auth'
import { parseProductText } from '@/lib/parse-products'

/**
 * Bulk product upload API
 * POST /api/products/bulk
 * Body: { raw_text: string }
 * Parses raw text/CSV using AI and creates all products at once.
 */
export async function POST(req: NextRequest) {
  try {
    const business = await getBusinessFromRequest(req as unknown as Request)
    if (!business) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { raw_text } = body

    if (!raw_text || raw_text.trim().length < 3) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }

    // Parse products using AI
    const parsed = await parseProductText(raw_text)

    if (parsed.length === 0) {
      return NextResponse.json({ error: 'Could not parse any products from the text. Try formatting as: Product Name, Price, Sizes' }, { status: 400 })
    }

    // Insert all products
    const created: any[] = []
    for (const p of parsed) {
      const result = await sql`
        INSERT INTO products (business_id, name, price, description, sizes, in_stock)
        VALUES (${business.id}, ${p.name}, ${p.price}, ${p.description}, ${p.sizes}, ${p.in_stock})
        RETURNING id, name, price
      `
      const row = (result as any[])[0]
      if (row) created.push(row)
    }

    return NextResponse.json({
      status: 'ok',
      created: created.length,
      products: created,
    })
  } catch (e: any) {
    console.error('[Bulk Products] Error:', e?.message || e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
