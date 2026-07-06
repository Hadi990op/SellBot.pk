import Link from 'next/link'
import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from './_components'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const business = await getBusinessFromCookies()

  if (!business) return <NoAccess />

  const bizId = business.id

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
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <DashboardHeader business={business} />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero report */}
        <div className="bg-gradient-to-br from-[#508DFF] to-[#1E4566] rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-20" />
          <div className="relative">
            <h2 className="text-lg font-medium mb-1">Today's Report 📊</h2>
            <p className="text-[#E8EEF7]/70 text-sm mb-6">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Inquiries" value={inquiries} icon="💬" />
              <Stat label="Orders" value={orders} icon="📦" />
              <Stat label="COD Verified" value={codVerified} icon="✅" />
              <Stat label="Revenue" value={revenue.toLocaleString()} icon="💰" />
            </div>
          </div>
        </div>

        {/* Quick cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <QuickCard title="Abandoned Inquiries" value={abandoned} subtitle="Follow-up needed" color="yellow" />
          <QuickCard title="Total Products" value={totalProducts} subtitle="In catalog" color="blue" />
          <QuickCard title="Plan" value={business.plan} subtitle={business.plan === 'trial' ? 'Upgrade to keep' : 'Active'} color="green" />
        </div>

        {/* Nav cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <NavCard href="/dashboard/orders" icon="📦" title="Orders" desc="View and manage all orders" />
          <NavCard href="/dashboard/conversations" icon="💬" title="Conversations" desc="View live chats — AI + human" />
          <NavCard href="/dashboard/products" icon="🏷️" title="Products" desc="Add or edit your catalog" />
        </div>

        {/* WhatsApp connect */}
        <div className="mb-8">
          <Link
            href="/dashboard/connect"
            className="block bg-gradient-to-r from-[#0F2A47] to-[#16365C] border border-[#508DFF]/20 rounded-xl p-6 hover:border-[#508DFF]/40 transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-semibold mb-1">Connect Your Number</h3>
                <p className="text-sm text-[#8B9DB8]">Scan a QR code or use a pairing code to connect your number — completely free!</p>
              </div>
              <div className="ml-auto text-[#508DFF] font-medium text-sm">Connect →</div>
            </div>
          </Link>
        </div>

        {/* Recent orders */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
          {ordArr.length > 0 ? (
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#0F2A47]/50 text-[#5A6B82] text-xs uppercase">
                  <tr>
                    <th className="text-left px-4 py-3">Customer</th>
                    <th className="text-left px-4 py-3">Items</th>
                    <th className="text-right px-4 py-3">Total</th>
                    <th className="text-left px-4 py-3">Payment</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#508DFF]/10">
                  {ordArr.map((o: any) => (
                    <tr key={o.id} className="hover:bg-[#0F2A47]/30 transition">
                      <td className="px-4 py-3 font-mono text-[#8B9DB8]">{o.customer_phone}</td>
                      <td className="px-4 py-3">{Array.isArray(o.items) ? o.items.length : 0} items</td>
                      <td className="px-4 py-3 text-right font-medium text-[#EFF35F]">{Number(o.total).toLocaleString()}</td>
                      <td className="px-4 py-3 uppercase text-xs text-[#8B9DB8]">{o.payment_method}</td>
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
          ) : (
            <div className="glass rounded-xl p-8 text-center text-[#5A6B82]">
              No orders today. Your AI agent is standing by! 🤖
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
      <div className="text-[#E8EEF7]/60 text-sm">{label}</div>
    </div>
  )
}

function QuickCard({ title, value, subtitle, color }: { title: string; value: any; subtitle: string; color: string }) {
  const colors: Record<string, string> = {
    yellow: 'border-[#EFF35F]/20 bg-[#EFF35F]/5',
    blue: 'border-[#508DFF]/20 bg-[#508DFF]/5',
    green: 'border-[#508DFF]/20 bg-[#508DFF]/5',
  }
  const textColors: Record<string, string> = {
    yellow: 'text-[#EFF35F]',
    blue: 'text-[#508DFF]',
    green: 'text-[#508DFF]',
  }
  return (
    <div className={`border rounded-xl p-4 ${colors[color] || 'border-[#508DFF]/20 bg-[#0F2A47]/30'}`}>
      <div className="text-sm text-[#8B9DB8]">{title}</div>
      <div className={`text-2xl font-bold mt-1 ${textColors[color] || 'text-[#E8EEF7]'}`}>{value}</div>
      <div className="text-xs text-[#5A6B82] mt-1">{subtitle}</div>
    </div>
  )
}

function NavCard({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block glass rounded-xl p-6 hover:border-[#508DFF]/40 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[#8B9DB8]">{desc}</p>
    </Link>
  )
}
