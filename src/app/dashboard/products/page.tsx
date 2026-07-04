import { supabaseAdmin } from '@/lib/supabase'

export default async function ProductsPage({ searchParams }: { searchParams: { biz?: string } }) {
  const bizId = searchParams.biz
  if (!bizId) return <div>Missing biz param</div>

  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('business_id', bizId)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🏷️ Products</h1>

        {!products || products.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
            Abhi koi product nahi. Onboarding me products add karein.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((p: any) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-2xl font-bold text-green-600 my-2">PKR {p.price.toLocaleString()}</div>
                {p.sizes && p.sizes.length > 0 && (
                  <div className="text-xs text-gray-500 mb-2">Sizes: {p.sizes.join(' / ')}</div>
                )}
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
