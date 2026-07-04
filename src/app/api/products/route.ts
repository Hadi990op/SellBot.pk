import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/supabase'
import { getBusinessFromRequest } from '@/lib/auth'

/**
 * Products API — add, list, delete products for the authenticated business.
 */

// POST — add product
export async function POST(req: NextRequest) {
  const business = await getBusinessFromRequest(req as any)
  if (!business) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const name = formData.get('name') as string
    const price = parseFloat(formData.get('price') as string)
    const sizesRaw = formData.get('sizes') as string
    const description = (formData.get('description') as string) || ''
    const inStock = formData.get('in_stock') === 'on'

    if (!name || isNaN(price)) {
      return NextResponse.json({ error: 'name and price required' }, { status: 400 })
    }

    const sizes = sizesRaw
      ? sizesRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : null

    await sql`
      INSERT INTO products (business_id, name, price, description, sizes, in_stock)
      VALUES (${business.id}, ${name}, ${price}, ${description}, ${sizes}, ${inStock})
    `

    // Redirect back to products page
    return NextResponse.redirect(new URL('/dashboard/products', req.url))
  } catch (e: any) {
    console.error('[Products] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}

// DELETE — delete product
export async function DELETE(req: NextRequest) {
  const business = await getBusinessFromRequest(req as any)
  if (!business) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  try {
    const { product_id } = await req.json()

    if (!product_id) {
      return NextResponse.json({ error: 'product_id required' }, { status: 400 })
    }

    // Verify product belongs to this business
    await sql`
      DELETE FROM products WHERE id = ${product_id} AND business_id = ${business.id}
    `

    return NextResponse.json({ status: 'ok' })
  } catch (e: any) {
    console.error('[Products DELETE] Error:', e?.message || e)
    return NextResponse.json({ error: 'internal error' }, { status: 500 })
  }
}
