import Link from 'next/link'

export function NoAccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Dashboard access nahi</h1>
        <p className="text-gray-500 mb-6">
          Aapka dashboard access token expire ho gaya hai ya set nahi hai.
          Onboarding se dobara login karein.
        </p>
        <Link
          href="/onboarding"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition inline-block"
        >
          Login / Setup →
        </Link>
      </div>
    </main>
  )
}

export function DashboardHeader({ business }: { business: { business_name: string; plan: string; trial_ends_at?: string | null } | null }) {
  const trialDays = business?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(business.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition">
          <span className="text-2xl">🤖</span>
          <div>
            <h1 className="font-bold text-lg">{business?.business_name || 'SellBot'}</h1>
            <p className="text-xs text-gray-400">SellBot Dashboard</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {business && business.plan === 'trial' && trialDays !== null && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
              {trialDays} din trial baaki
            </span>
          )}
          {business && (
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium uppercase">
              {business.plan}
            </span>
          )}
          <Link href="/dashboard/connect" className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition">
            📱 WhatsApp
          </Link>
        </div>
      </div>
    </header>
  )
}
