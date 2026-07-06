import Link from 'next/link'

export function NoAccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A1628] text-[#E8EEF7]">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-xl font-bold mb-2">Dashboard access nahi</h1>
        <p className="text-[#8B9DB8] mb-6">
          Aapka dashboard access token expire ho gaya hai ya set nahi hai.
          Onboarding se dobara login karein.
        </p>
        <Link
          href="/onboarding"
          className="btn-electric px-6 py-3 rounded-lg font-medium inline-block"
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
    <header className="bg-[#0F2A47]/80 backdrop-blur-xl border-b border-[#508DFF]/10 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 w-5 h-5 rounded-md bg-[#508DFF] opacity-90" />
            <div className="absolute top-1 left-1 w-5 h-5 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-[#E8EEF7]">{business?.business_name || 'SellBot'}</h1>
            <p className="text-[10px] text-[#5A6B82]">Dashboard</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {business && business.plan === 'trial' && trialDays !== null && (
            <span className="text-xs bg-[#EFF35F]/10 text-[#EFF35F] px-3 py-1 rounded-full font-medium border border-[#EFF35F]/20">
              {trialDays} din trial baaki
            </span>
          )}
          {business && (
            <span className="text-xs bg-[#508DFF]/10 text-[#508DFF] px-3 py-1 rounded-full font-medium uppercase border border-[#508DFF]/20">
              {business.plan}
            </span>
          )}
          <Link href="/dashboard/connect" className="text-xs bg-[#EFF35F]/10 text-[#EFF35F] px-3 py-1 rounded-full font-medium hover:bg-[#EFF35F]/20 transition border border-[#EFF35F]/20">
            📱 WhatsApp
          </Link>
        </div>
      </div>
    </header>
  )
}
