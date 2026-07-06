import Link from 'next/link'
import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../../_components'

export const dynamic = 'force-dynamic'

export default async function ConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const { id: conversationId } = await params

  const convResult = await sql`
    SELECT * FROM conversations WHERE id = ${conversationId} AND business_id = ${business.id} LIMIT 1
  `
  const conversation = (convResult as any[])[0]
  if (!conversation) {
    return (
      <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
        <DashboardHeader business={business} />
        <div className="max-w-3xl mx-auto p-6 text-center text-[#5A6B82]">
          <p>Conversation not found.</p>
          <Link href="/dashboard/conversations" className="text-[#508DFF] font-medium mt-4 inline-block">← Back</Link>
        </div>
      </main>
    )
  }

  const messages = await sql`
    SELECT * FROM messages WHERE conversation_id = ${conversationId} ORDER BY created_at ASC
  `
  const orders = await sql`
    SELECT * FROM orders WHERE conversation_id = ${conversationId} ORDER BY created_at DESC
  `

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <DashboardHeader business={business} />
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/dashboard/conversations" className="text-[#508DFF] font-medium text-sm mb-4 inline-block">← Conversations</Link>

        <div className="glass rounded-xl p-4 mb-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">{conversation.customer_name || conversation.customer_phone}</div>
            <div className="text-xs text-[#5A6B82] font-mono">{conversation.customer_phone}</div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${conversation.status === 'active' ? 'bg-[#508DFF]/10 text-[#508DFF]' : conversation.status === 'order_placed' ? 'bg-[#EFF35F]/10 text-[#EFF35F]' : conversation.status === 'abandoned' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-[#0F2A47] text-[#5A6B82]'}`}>
            {conversation.status}
          </span>
        </div>

        {/* Messages */}
        <div className="glass rounded-xl p-4 space-y-3 mb-4">
          <h3 className="font-semibold text-sm text-[#5A6B82] uppercase mb-2">Chat History</h3>
          {(messages as any[]).map((m: any) => (
            <div key={m.id} className={`flex ${m.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                m.role === 'customer'
                  ? 'bg-[#0F2A47] text-[#E8EEF7]'
                  : m.role === 'agent'
                  ? 'bg-[#508DFF] text-white'
                  : 'bg-[#EFF35F] text-[#0A1628]'
              }`}>
                <div className="text-xs opacity-60 mb-1">
                  {m.role === 'customer' ? 'Customer' : m.role === 'agent' ? 'AI Agent' : 'Owner'} · {new Date(m.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Orders */}
        {(orders as any[]).length > 0 && (
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold text-sm text-[#5A6B82] uppercase mb-3">Orders</h3>
            {(orders as any[]).map((o: any) => (
              <div key={o.id} className="border-b border-[#508DFF]/10 pb-2 mb-2 last:border-0">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-[#E8EEF7]">
                    {Array.isArray(o.items) ? o.items.length : 0} items — <span className="text-[#EFF35F] font-medium">{Number(o.total).toLocaleString()}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${o.status === 'confirmed' ? 'bg-[#EFF35F]/10 text-[#EFF35F]' : 'bg-[#508DFF]/10 text-[#508DFF]'}`}>
                    {o.status}
                  </span>
                </div>
                <div className="text-xs text-[#5A6B82] mt-1">{o.payment_method.toUpperCase()} · {o.cod_verified ? 'COD Verified ✅' : 'COD Pending ⏳'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
