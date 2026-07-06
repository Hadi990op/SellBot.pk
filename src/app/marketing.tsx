import Link from 'next/link'

export function MarketingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/80 backdrop-blur-xl border-b border-[#508DFF]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 w-6 h-6 rounded-md bg-[#508DFF] opacity-90" />
            <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#E8EEF7]">
            SellBot<span className="text-[#508DFF]">.pk</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#8B9DB8]">
          <Link href="/#features" className="hover:text-[#E8EEF7] transition">Features</Link>
          <Link href="/#how" className="hover:text-[#E8EEF7] transition">How it Works</Link>
          <Link href="/#pricing" className="hover:text-[#E8EEF7] transition">Pricing</Link>
          <Link href="/about" className="hover:text-[#E8EEF7] transition">About</Link>
          <Link href="/contact" className="hover:text-[#E8EEF7] transition">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/onboarding" className="hidden sm:block text-sm text-[#8B9DB8] hover:text-[#E8EEF7] transition">
            Login
          </Link>
          <Link href="/onboarding" className="btn-electric text-sm px-5 py-2 rounded-lg">
            Free Trial →
          </Link>
        </div>
      </div>
    </nav>
  )
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#508DFF]/10 bg-[#0A1628] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 w-6 h-6 rounded-md bg-[#508DFF] opacity-90" />
                <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
              </div>
              <span className="text-lg font-bold text-[#E8EEF7]">SellBot<span className="text-[#508DFF]">.pk</span></span>
            </Link>
            <p className="text-sm text-[#5A6B82]">Pakistani businesses ke liye banaya gaya. 🇵🇰</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#5A6B82] mb-4">Product</div>
            <div className="space-y-2 text-sm">
              <Link href="/#features" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Features</Link>
              <Link href="/#how" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">How it Works</Link>
              <Link href="/#pricing" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Pricing</Link>
              <Link href="/#results" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Results</Link>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#5A6B82] mb-4">Company</div>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">About</Link>
              <Link href="/contact" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Contact</Link>
              <Link href="/blog" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Blog</Link>
              <Link href="/privacy" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Privacy</Link>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#5A6B82] mb-4">Get Started</div>
            <div className="space-y-2 text-sm">
              <Link href="/onboarding" className="text-[#508DFF] hover:text-[#6FA3FF] transition block font-medium">Free Trial →</Link>
              <Link href="/dashboard" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Dashboard</Link>
              <Link href="/dashboard/connect" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Connect WhatsApp</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#508DFF]/10 pt-6 flex justify-between items-center flex-wrap gap-4">
          <p className="text-xs text-[#5A6B82]">© 2026 SellBot.pk. All rights reserved. Made in Pakistan 🇵🇰</p>
          <p className="text-xs text-[#5A6B82] font-mono">Trust. Technical Depth. Focus.</p>
        </div>
      </div>
    </footer>
  )
}
