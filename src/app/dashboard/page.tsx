import Link from 'next/link'
import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from './_components'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const business = await getBusinessFromCookies()

  if (!business) return <NoAccess />

  const bizId = business.id

  // Today's stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = today.toISOString()

  const todayConvs = await sql`
    SELECT * FROM conversations WHERE business_id = ${bizId} AND created_at >= ${todayISO}::timestamptz
  `
  const todayOrders = await sql`
    SELECT * FROM orders WHERE business_id = ${bizId} AND created_at >= ${todayISO}::timestamptz
  `
  const productCount = await sql`SELECT count(*) as cnt FROM products WHERE business_id = ${bizId}`

  const convArr = todayConvs as any[]
  const ordArr = todayOrders as any[]

  const inquiries = convArr.length
  const orders = ordArr.length
  const codVerified = ordArr.filter((o) => o.cod_verified).length
  const revenue = ordArr.reduce((sum, o) => sum + Number(o.total), 0)
  const abandoned = convArr.filter((c) => c.status === 'abandoned').length
  const totalProducts = (productCount as any[])[0]?.cnt || 0

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader business={business} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white mb-8">
          <h2 className="text-lg font-medium mb-1">Aaj ki Report 📊</h2>
          <p className="text-green-100 text-sm mb-6">{new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Inquiries" value={inquiries} icon="💬" />
            <Stat label="Orders" value={orders} icon="📦" />
            <Stat label="COD Verified" value={codVerified} icon="✅" />
            <Stat label="Revenue" value={`PKR ${revenue.toLocaleString()}`} icon="💰" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <QuickCard title="Abandoned Inquiries" value={abandoned} subtitle="Follow-up needed" color="yellow" />
          <QuickCard title="Total Products" value={totalProducts} subtitle="In catalog" color="blue" />
          <QuickCard title="Plan" value={business.plan} subtitle={business.plan === 'trial' ? 'Upgrade to keep' : 'Active'} color="green" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <NavCard href="/dashboard/orders" icon="📦" title="Orders" desc="Sab orders dekhein aur manage karein" />
          <NavCard href="/dashboard/conversations" icon="💬" title="Conversations" desc="Live chats dekhein — AI + human" />
          <NavCard href="/dashboard/products" icon="🏷️" title="Products" desc="Catalog add/edit karein" />
        </div>

        {!business.phone_number_id && (
          <div className="mt-4">
            <Link
              href="/dashboard/whatsapp-setup"
              className="block bg-yellow-50 border border-yellow-200 rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">📱</div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp Connect Karein</h3>
                  <p className="text-sm text-gray-600">Abhi WhatsApp connect nahi hai. Setup guide follow karein.</p>
                </div>
                <div className="ml-auto text-green-600 font-medium text-sm">Setup →</div>
              </div>
            </Link>
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
          {ordArr.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3">Customer</th>
                    <th className="text-left px-4 py-3">Items</th>
                    <th className="text-right px-4 py-3">Total</th>
                    <th className="text-left px-4 py-3">Payment</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ordArr.map((o: any) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{o.customer_phone}</td>
                      <td className="px-4 py-3">{Array.isArray(o.items) ? o.items.length : 0} items</td>
                      <td className="px-4 py-3 text-right font-medium">PKR {Number(o.total).toLocaleString()}</td>
                      <td className="px-4 py-3 uppercase text-xs">{o.payment_method}</td>
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
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
              Aaj koi order nahi aaya. SellBot wait kar raha hai! 🤖
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function Stat({ label, value, icon }: { label: string; value: any; icon: string }) {
  return (
    <div>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-green-100 text-sm">{label}</div>
    </div>
  )
}

function QuickCard({ title, value, subtitle, color }: { title: string; value: any; subtitle: string; color: string }) {
  const colors: Record<string, string> = {
    yellow: 'border-yellow-200 bg-yellow-50',
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
  }
  return (
    <div className={`border rounded-xl p-4 ${colors[color] || 'border-gray-200 bg-white'}`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
    </div>
  )
}

function NavCard({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-green-200 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </Link>
  )
}
