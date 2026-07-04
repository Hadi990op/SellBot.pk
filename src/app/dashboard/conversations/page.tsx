import { supabaseAdmin } from '@/lib/supabase'

export default async function ConversationsPage({ searchParams }: { searchParams: { biz?: string } }) {
  const bizId = searchParams.biz
  if (!bizId) return <div>Missing biz param</div>

  const { data: conversations } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('business_id', bizId)
    .order('created_at', { ascending: false })
    .limit(30)

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">💬 Conversations</h1>

        {!conversations || conversations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400">
            Abhi koi conversation nahi. Jab customer WhatsApp pe message karega, yahan dikh jayega.
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map((c: any) => (
              <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.customer_name || c.customer_phone}</div>
                  <div className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString('ur-PK')}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'active' ? 'bg-blue-100 text-blue-700' : c.status === 'order_placed' ? 'bg-green-100 text-green-700' : c.status === 'abandoned' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                    {c.status}
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
