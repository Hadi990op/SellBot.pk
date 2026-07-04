import Link from 'next/link'
import { sql } from '@/lib/supabase'

export default async function DashboardPage({ searchParams }: { searchParams: { biz?: string } }) {
  const bizId = searchParams.biz

  if (!bizId) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Koi business selected nahi.</p>
          <Link href="/onboarding" className="text-green-600 font-medium">Pehle setup karein →</Link>
        </div>
      </main>
    )
  }

  // Fetch business
  const bizResult = await sql`SELECT * FROM businesses WHERE id = ${bizId} LIMIT 1`
  const business = (bizResult as any[])[0]

  if (!business) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Business nahi mila.</p>
      </main>
    )
  }

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
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="font-bold text-lg">{business.business_name}</h1>
              <p className="text-xs text-gray-400">SellBot Dashboard</p>
            </div>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            {business.plan === 'trial' ? '14 Din Free Trial' : business.plan.toUpperCase()}
          </span>
        </div>
      </header>

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
          <NavCard href={`/dashboard/orders?biz=${bizId}`} icon="📦" title="Orders" desc="Sab orders dekhein aur manage karein" />
          <NavCard href={`/dashboard/conversations?biz=${bizId}`} icon="💬" title="Conversations" desc="Live chats dekhein — AI + human" />
          <NavCard href={`/dashboard/products?biz=${bizId}`} icon="🏷️" title="Products" desc="Catalog add/edit karein" />
        </div>

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
