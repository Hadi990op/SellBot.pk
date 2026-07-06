import Link from 'next/link'
import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../_components'

export const dynamic = 'force-dynamic'

export default async function ConversationsPage() {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const conversations = await sql`SELECT * FROM conversations WHERE business_id = ${business.id} ORDER BY created_at DESC LIMIT 30`

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <DashboardHeader business={business} />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">💬 Conversations</h1>
        {(!conversations || (conversations as any[]).length === 0) ? (
          <div className="glass rounded-xl p-12 text-center text-[#5A6B82]">
            Abhi koi conversation nahi. Jab customer WhatsApp pe message karega, yahan dikh jayega.
          </div>
        ) : (
          <div className="space-y-3">
            {(conversations as any[]).map((c: any) => (
              <Link
                key={c.id}
                href={`/dashboard/conversations/${c.id}`}
                className="glass rounded-xl p-4 flex items-center justify-between hover:border-[#508DFF]/40 transition block"
              >
                <div>
                  <div className="font-medium">{c.customer_name || c.customer_phone}</div>
                  <div className="text-xs text-[#5A6B82]">{new Date(c.created_at).toLocaleString('en-PK')}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'active' ? 'bg-[#508DFF]/10 text-[#508DFF]' : c.status === 'order_placed' ? 'bg-[#EFF35F]/10 text-[#EFF35F]' : c.status === 'abandoned' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-[#0F2A47] text-[#5A6B82]'}`}>
                  {c.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
