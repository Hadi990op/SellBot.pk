import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../_components'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const orders = await sql`SELECT * FROM orders WHERE business_id = ${business.id} ORDER BY created_at DESC LIMIT 50`

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <DashboardHeader business={business} />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">📦 Orders</h1>
        {(!orders || (orders as any[]).length === 0) ? (
          <div className="glass rounded-xl p-12 text-center text-[#5A6B82]">
            Abhi koi order nahi. Jab customer WhatsApp pe order karega, yahan dikh jayega.
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#0F2A47]/50 text-[#5A6B82] text-xs uppercase">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Items</th>
                  <th className="text-right px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Payment</th>
                  <th className="text-left px-4 py-3">COD</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#508DFF]/10">
                {(orders as any[]).map((o: any) => (
                  <tr key={o.id} className="hover:bg-[#0F2A47]/30 transition">
                    <td className="px-4 py-3 text-xs text-[#5A6B82]">{new Date(o.created_at).toLocaleDateString('en-PK')}</td>
                    <td className="px-4 py-3 font-mono text-[#8B9DB8]">{o.customer_phone}</td>
                    <td className="px-4 py-3">{Array.isArray(o.items) ? o.items.length : 0} items</td>
                    <td className="px-4 py-3 text-right font-medium text-[#EFF35F]">PKR {Number(o.total).toLocaleString()}</td>
                    <td className="px-4 py-3 uppercase text-xs text-[#8B9DB8]">{o.payment_method}</td>
                    <td className="px-4 py-3">{o.cod_verified ? '✅' : '⏳'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${o.status === 'confirmed' ? 'bg-[#EFF35F]/10 text-[#EFF35F]' : o.status === 'pending' ? 'bg-[#508DFF]/10 text-[#508DFF]' : 'bg-[#0F2A47] text-[#5A6B82]'}`}>
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
