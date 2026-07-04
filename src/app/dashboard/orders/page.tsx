import { supabaseAdmin } from '@/lib/supabase'

export default async function OrdersPage({ searchParams }: { searchParams: { biz?: string } }) {
  const bizId = searchParams.biz
  if (!bizId) return <div>Missing biz param</div>

  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('business_id', bizId)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📦 Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
            Abhi koi order nahi. Jab customer WhatsApp pe order karega, yahan dikh jayega.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Items</th>
                  <th className="text-right px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Payment</th>
                  <th className="text-left px-4 py-3">COD Verified</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(o.created_at).toLocaleDateString('ur-PK')}</td>
                    <td className="px-4 py-3">{o.customer_phone}</td>
                    <td className="px-4 py-3">{o.items?.length || 0} items</td>
                    <td className="px-4 py-3 text-right font-medium">PKR {Number(o.total).toLocaleString()}</td>
                    <td className="px-4 py-3 uppercase text-xs">{o.payment_method}</td>
                    <td className="px-4 py-3">{o.cod_verified ? '✅' : '⏳'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${o.status === 'confirmed' ? 'bg-green-100 text-green-700' : o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
