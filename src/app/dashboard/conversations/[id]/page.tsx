import Link from 'next/link'
import { sql } from '@/lib/supabase'
import { getBusinessFromCookies } from '@/lib/auth'
import { NoAccess, DashboardHeader } from '../../_components'

export const dynamic = 'force-dynamic'

export default async function ConversationDetailPage({ params }: { params: { id: string } }) {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const conversationId = params.id

  // Verify this conversation belongs to this business
  const convResult = await sql`
    SELECT * FROM conversations WHERE id = ${conversationId} AND business_id = ${business.id} LIMIT 1
  `
  const conversation = (convResult as any[])[0]
  if (!conversation) {
    return (
      <main className="min-h-screen bg-gray-50">
        <DashboardHeader business={business} />
        <div className="max-w-3xl mx-auto p-6 text-center text-gray-400">
          <p>Conversation nahi mila.</p>
          <Link href="/dashboard/conversations" className="text-green-600 font-medium mt-4 inline-block">← Wapas</Link>
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
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader business={business} />
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/dashboard/conversations" className="text-green-600 font-medium text-sm mb-4 inline-block">← Conversations</Link>

        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">{conversation.customer_name || conversation.customer_phone}</div>
            <div className="text-xs text-gray-400">{conversation.customer_phone}</div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${conversation.status === 'active' ? 'bg-blue-100 text-blue-700' : conversation.status === 'order_placed' ? 'bg-green-100 text-green-700' : conversation.status === 'abandoned' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
            {conversation.status}
          </span>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 mb-4">
          <h3 className="font-semibold text-sm text-gray-500 uppercase mb-2">Chat History</h3>
          {(messages as any[]).map((m: any) => (
            <div key={m.id} className={`flex ${m.role === 'customer' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                m.role === 'customer'
                  ? 'bg-gray-100 text-gray-800'
                  : m.role === 'agent'
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}>
                <div className="text-xs opacity-70 mb-1">
                  {m.role === 'customer' ? 'Customer' : m.role === 'agent' ? 'AI Agent' : 'Owner'} · {new Date(m.created_at).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                </div>
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Orders from this conversation */}
        {(orders as any[]).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">Orders</h3>
            {(orders as any[]).map((o: any) => (
              <div key={o.id} className="border-b border-gray-50 pb-2 mb-2 last:border-0">
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    {Array.isArray(o.items) ? o.items.length : 0} items — PKR {Number(o.total).toLocaleString()}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${o.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {o.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{o.payment_method.toUpperCase()} · {o.cod_verified ? 'COD Verified ✅' : 'COD Pending ⏳'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
