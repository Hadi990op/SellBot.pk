import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../_components'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const products = await sql`SELECT * FROM products WHERE business_id = ${business.id} ORDER BY created_at DESC`

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <DashboardHeader business={business} />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">🏷️ Products</h1>
          <button
            id="add-product-btn"
            className="btn-electric px-4 py-2 rounded-lg font-medium text-sm"
          >
            + Product Add
          </button>
        </div>

        {/* Add product form */}
        <div id="add-product-form" className="hidden glass rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-4">Naya Product</h2>
          <form action="/api/products" method="POST" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Product naam" required className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
              <input name="price" type="number" placeholder="Price (PKR)" required className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
            </div>
            <input name="sizes" placeholder="Sizes (e.g. S,M,L,XL) — optional" className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
            <textarea name="description" placeholder="Description" rows={2} className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
            <div className="flex items-center gap-2">
              <input type="checkbox" name="in_stock" id="in_stock" defaultChecked className="rounded accent-[#508DFF]" />
              <label htmlFor="in_stock" className="text-sm text-[#8B9DB8]">In Stock</label>
            </div>
            <button type="submit" className="btn-electric px-6 py-2 rounded-lg font-medium">
              Save Product
            </button>
          </form>
        </div>

        {(!products || (products as any[]).length === 0) ? (
          <div className="glass rounded-xl p-12 text-center text-[#5A6B82]">
            Abhi koi product nahi. Onboarding me products add karein ya "+ Product Add" button se add karein.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {(products as any[]).map((p: any) => (
              <div key={p.id} className="glass rounded-xl p-4 hover:border-[#508DFF]/40 transition">
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-2xl font-bold text-[#EFF35F] my-2">PKR {Number(p.price).toLocaleString()}</div>
                {p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0 && (
                  <div className="text-xs text-[#5A6B82] mb-2">Sizes: {p.sizes.join(' / ')}</div>
                )}
                <p className="text-sm text-[#8B9DB8]">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.in_stock ? 'bg-[#EFF35F]/10 text-[#EFF35F]' : 'bg-red-500/10 text-red-400'}`}>
                    {p.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button
                    data-product-id={p.id}
                    data-product-name={p.name}
                    className="delete-product-btn text-xs text-red-400 hover:text-red-300 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('add-product-btn')?.addEventListener('click', () => {
          document.getElementById('add-product-form')?.classList.toggle('hidden')
        })
        document.querySelectorAll('.delete-product-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.dataset.productId
            const name = btn.dataset.productName
            if (!confirm('"' + name + '" delete karna hai?')) return
            const res = await fetch('/api/products', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ product_id: id })
            })
            if (res.ok) location.reload()
            else alert('Delete failed')
          })
        })
      `}} />
    </main>
  )
}
