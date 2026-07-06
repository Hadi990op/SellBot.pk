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
          <div className="flex gap-2">
            <button
              id="bulk-upload-btn"
              className="btn-ghost px-4 py-2 rounded-lg font-medium text-sm"
            >
              ⚡ Bulk Upload
            </button>
            <button
              id="add-product-btn"
              className="btn-electric px-4 py-2 rounded-lg font-medium text-sm"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Bulk upload form (AI-powered) */}
        <div id="bulk-upload-form" className="hidden glass rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-2">Bulk Upload Products</h2>
          <p className="text-sm text-[#8B9DB8] mb-4">
            Paste your product list in any format — one product per line. Our AI will automatically parse names, prices, sizes, and descriptions.
            <br />
            <span className="text-[#5A6B82]">Examples: "Lawn Suit, 1500, S M L, Premium cotton" or "Black Shirt - 1200" or just copy-paste from your notes.</span>
          </p>
          <form id="bulk-form" className="space-y-4">
            <textarea
              id="bulk-text"
              placeholder={`Lawn Suit, 1500, S M L XL, Premium cotton lawn fabric
Cotton Kurti, 1200, S M L, Embroidered neck
Silk Dupatta, 800, Free Size, Pure silk with block print
Jeans, 2500, 30 32 34 36, Slim fit denim`}
              rows={8}
              className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none font-mono"
            />
            <div className="flex items-center gap-3">
              <button type="submit" id="bulk-submit" className="btn-electric px-6 py-2 rounded-lg font-medium">
                Parse & Add All Products
              </button>
              <span id="bulk-status" className="text-sm text-[#8B9DB8]"></span>
            </div>
            <div id="bulk-result" className="hidden"></div>
          </form>
        </div>

        {/* Add product form */}
        <div id="add-product-form" className="hidden glass rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-4">New Product</h2>
          <form action="/sellbot/api/products" method="POST" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Product name" required className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
              <input name="price" type="number" placeholder="Price" required className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none" />
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
            No products yet. Use "Bulk Upload" to add many products at once, or "+ Add Product" to add one at a time.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {(products as any[]).map((p: any) => (
              <div key={p.id} className="glass rounded-xl p-4 hover:border-[#508DFF]/40 transition">
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-2xl font-bold text-[#EFF35F] my-2">{Number(p.price).toLocaleString()}</div>
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
          document.getElementById('bulk-upload-form')?.classList.add('hidden')
        })
        document.getElementById('bulk-upload-btn')?.addEventListener('click', () => {
          document.getElementById('bulk-upload-form')?.classList.toggle('hidden')
          document.getElementById('add-product-form')?.classList.add('hidden')
        })

        // Bulk upload via AI
        document.getElementById('bulk-form')?.addEventListener('submit', async (e) => {
          e.preventDefault()
          const text = document.getElementById('bulk-text').value
          if (!text.trim()) return
          const btn = document.getElementById('bulk-submit')
          const status = document.getElementById('bulk-status')
          const result = document.getElementById('bulk-result')
          btn.disabled = true
          btn.textContent = 'Parsing with AI...'
          status.textContent = 'Analyzing your product list...'
          result.classList.add('hidden')
          try {
            const res = await fetch('/sellbot/api/products/bulk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ raw_text: text })
            })
            const data = await res.json()
            if (data.error) {
              status.textContent = '❌ ' + data.error
            } else {
              status.textContent = '✅ Added ' + data.created + ' products!'
              result.classList.remove('hidden')
              result.innerHTML = '<div class="bg-[#EFF35F]/10 border border-[#EFF35F]/30 rounded-lg p-4 mt-3"><div class="font-medium text-[#EFF35F] mb-2">Products added:</div><ul class="text-sm text-[#8B9DB8] space-y-1">' +
                data.products.map(p => '<li>• ' + p.name + ' — ' + p.price + '</li>').join('') +
                '</ul><p class="text-xs text-[#5A6B82] mt-3">Page will reload in 2 seconds...</p></div>'
              setTimeout(() => location.reload(), 2000)
            }
          } catch (err) {
            status.textContent = '❌ Error: ' + err.message
          }
          btn.disabled = false
          btn.textContent = 'Parse & Add All Products'
        })

        document.querySelectorAll('.delete-product-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.dataset.productId
            const name = btn.dataset.productName
            if (!confirm('Delete "' + name + '"?')) return
            const res = await fetch('/sellbot/api/products', {
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
