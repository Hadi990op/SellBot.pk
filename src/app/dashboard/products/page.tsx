import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../_components'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const products = await sql`SELECT * FROM products WHERE business_id = ${business.id} ORDER BY created_at DESC`

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader business={business} />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">🏷️ Products</h1>
          <button
            id="add-product-btn"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm"
          >
            + Product Add
          </button>
        </div>

        {/* Add product form (hidden by default, toggled via JS) */}
        <div id="add-product-form" className="hidden bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold mb-4">Naya Product</h2>
          <form action="/api/products" method="POST" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Product naam" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input name="price" type="number" placeholder="Price (PKR)" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <input name="sizes" placeholder="Sizes (e.g. S,M,L,XL) — optional" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <textarea name="description" placeholder="Description" rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <div className="flex items-center gap-2">
              <input type="checkbox" name="in_stock" id="in_stock" defaultChecked className="rounded" />
              <label htmlFor="in_stock" className="text-sm text-gray-600">In Stock</label>
            </div>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Save Product
            </button>
          </form>
        </div>

        {(!products || (products as any[]).length === 0) ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
            Abhi koi product nahi. Onboarding me products add karein ya "+ Product Add" button se add karein.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {(products as any[]).map((p: any) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-2xl font-bold text-green-600 my-2">PKR {Number(p.price).toLocaleString()}</div>
                {p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0 && (
                  <div className="text-xs text-gray-500 mb-2">Sizes: {p.sizes.join(' / ')}</div>
                )}
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button
                    data-product-id={p.id}
                    data-product-name={p.name}
                    className="delete-product-btn text-xs text-red-500 hover:text-red-700 font-medium"
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
