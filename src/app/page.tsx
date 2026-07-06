import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7] overflow-x-hidden">
      {/* ===================== NAV ===================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/80 backdrop-blur-xl border-b border-[#508DFF]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo — two overlapping rounded squares (Guardbase style) */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 w-6 h-6 rounded-md bg-[#508DFF] opacity-90" />
              <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              SellBot
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#8B9DB8]">
            <Link href="/#features" className="hover:text-[#E8EEF7] transition">Features</Link>
            <Link href="/#how" className="hover:text-[#E8EEF7] transition">How it Works</Link>
            <Link href="/#pricing" className="hover:text-[#E8EEF7] transition">Pricing</Link>
            <Link href="/#results" className="hover:text-[#E8EEF7] transition">Results</Link>
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

      {/* ===================== HERO ===================== */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-dot-grid opacity-60" />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#508DFF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 tag-acid px-4 py-1.5 rounded-full text-xs font-medium mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFF35F] animate-pulse" />
            AI sales agent for your business chat
          </div>

          {/* Headline — split weight (Guardbase signature) */}
          <h1 className="heading-split text-5xl md:text-7xl mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Your AI sales agent.<br />
            <span className="heading-accent">Never misses a customer.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#8B9DB8] max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            A 24/7 AI agent that connects to <span className="text-[#E8EEF7] font-medium">your business number</span> and replies to customers, takes orders, confirms cash-on-delivery, and sends you daily revenue reports — all on autopilot. You sleep, SellBot works.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base">
              Start Your 14-Day Free Trial →
            </Link>
            <a href="#how" className="btn-ghost px-8 py-3.5 rounded-xl text-base">
              ↓ How It Works
            </a>
          </div>
          <p className="text-sm text-[#5A6B82] animate-fade-up" style={{ animationDelay: '0.4s' }}>
            No credit card required • Connect in 5 minutes • Cancel anytime
          </p>
        </div>

        {/* Hero visual — dashboard mockup */}
        <div className="relative max-w-4xl mx-auto mt-16 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="glass rounded-2xl p-2 shadow-2xl shadow-[#508DFF]/10">
            <div className="rounded-xl overflow-hidden bg-[#0F2A47] border border-[#508DFF]/10">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#508DFF]/10">
                <div className="w-3 h-3 rounded-full bg-[#EFF35F]/40" />
                <div className="w-3 h-3 rounded-full bg-[#508DFF]/40" />
                <div className="w-3 h-3 rounded-full bg-[#8B9DB8]/20" />
                <div className="ml-4 text-xs text-[#5A6B82] font-mono">dashboard.sellbot.app</div>
              </div>
              {/* Mock dashboard */}
              <div className="p-6 grid grid-cols-3 gap-3 text-left">
                <div className="col-span-1 space-y-3">
                  <div className="text-xs text-[#5A6B82] uppercase tracking-wider">Today</div>
                  <div className="text-2xl font-bold text-[#EFF35F]">12 orders</div>
                  <div className="text-lg font-bold text-[#508DFF]">$47K</div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-3/4 rounded-full bg-[#508DFF]" /></div>
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-1/2 rounded-full bg-[#508DFF]" /></div>
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-2/3 rounded-full bg-[#EFF35F]" /></div>
                  </div>
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="text-xs text-[#5A6B82] uppercase tracking-wider">Live Conversations</div>
                  <MockChat name="Gulzar Fabrics" msg="Customer: Is the black shirt available in size M? → AI: Yes! Size M is in stock for $1,200. Cash on delivery available. Reply YES to place your order ✨" />
                  <MockChat name="Lahore Eats" msg="Customer: 2x biryani for delivery → AI: Confirmed! 2x biryani, $800, delivery in 30 min. Please share your address 🌟" />
                  <MockChat name="Dr. Khan Clinic" msg="Customer: Appointment tomorrow? → AI: 2pm and 4pm are available. Which time suits you? 😊" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF ===================== */}
      <section className="border-y border-[#508DFF]/10 bg-[#0F2A47]/30 py-6 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center text-[#5A6B82] text-sm font-medium">
              <span>40% of revenue lost to ignored leads</span>
              <span className="text-[#508DFF]">•</span>
              <span>24/7 — never sleeps</span>
              <span className="text-[#508DFF]">•</span>
              <span>$9–$25/mo plans</span>
              <span className="text-[#508DFF]">•</span>
              <span>14-day free trial</span>
              <span className="text-[#508DFF]">•</span>
              <span>40% of revenue lost to ignored leads</span>
              <span className="text-[#508DFF]">•</span>
              <span>24/7 — never sleeps</span>
              <span className="text-[#508DFF]">•</span>
              <span>$9–$25/mo plans</span>
              <span className="text-[#508DFF]">•</span>
              <span>14-day free trial</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap- gap-6">
          <StatCard value="24/7" label="Always-on customer replies" />
          <StatCard value="40%" label="Revenue lost to unanswered messages" />
          <StatCard value="5 min" label="To go live with your number" />
          <StatCard value="0" label="Credit card required to start" />
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="py-20 px-6 bg-[#0F2A47]/20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="How it works"
            title={<>Live in <span className="heading-accent">5 minutes.</span></>}
            subtitle="Connect your existing number, add your product catalog, and the AI runs on autopilot."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <StepCard
              num="01"
              title="Connect your number"
              desc="Scan a QR code or enter a 6-digit pairing code to connect your existing business number. No new number needed — your customers keep chatting with you."
              icon="📱"
            />
            <StepCard
              num="02"
              title="Add your catalog"
              desc="Add your products — name, price, sizes, and description. SellBot remembers everything and tells customers exactly what they need to know."
              icon="🏷️"
            />
            <StepCard
              num="03"
              title="Sales on autopilot"
              desc="A customer messages in → the AI replies instantly → confirms the order → and sends you a daily revenue report every morning."
              icon="🤖"
            />
          </div>
        </div>
      </section>

      {/* ===================== FEATURES (Bento Grid) ===================== */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Features"
            title={<>Built to <span className="heading-accent">sell for you.</span></>}
            subtitle="Everything a growing business needs — instant replies, COD verification, revenue reports, and more."
          />
          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {/* Large feature — Natural conversation */}
            <div className="glass rounded-2xl p-8 md:col-span-2 md:row-span-1 hover:border-[#508DFF]/40 transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Natural Conversation</h3>
                  <p className="text-[#8B9DB8] text-sm leading-relaxed">"Is the black shirt available in size M?" — SellBot understands your customers like a trained sales rep. It replies naturally, answers follow-up questions, and guides every conversation toward a sale.</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">Instant replies</span>
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">Follow-up aware</span>
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">Sale-focused</span>
                  </div>
                </div>
              </div>
            </div>
            {/* COD Verification */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">💵</div>
              <h3 className="text-xl font-bold mb-2">COD Verification</h3>
              <p className="text-[#8B9DB8] text-sm">Fake cash-on-delivery orders cost businesses 30%+ in wasted deliveries. SellBot verifies every order before it ships — saving you money every month.</p>
            </div>
            {/* Daily Report */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Daily Revenue Report</h3>
              <p className="text-[#8B9DB8] text-sm">Every morning at 9 AM you get a summary: "Yesterday — 12 orders, $47,000 — while you were asleep."</p>
            </div>
            {/* Abandoned Recovery */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Abandoned Recovery</h3>
              <p className="text-[#8B9DB8] text-sm">A customer said "I'll think about it"? SellBot sends a smart follow-up 4 hours later to bring them back.</p>
            </div>
            {/* Self-learning */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2">Learns Your Voice</h3>
              <p className="text-[#8B9DB8] text-sm">SellBot learns from your past conversations — your tone, your words, your style — so every reply sounds like it came from you.</p>
            </div>
            {/* Multi-agent */}
            <div className="glass rounded-2xl p-8 md:col-span-2 hover:border-[#508DFF]/40 transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">👥</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Multi-Agent Inbox</h3>
                  <p className="text-[#8B9DB8] text-sm leading-relaxed">Scale from one person up to five staff members. The AI handles 80% of conversations automatically, and for the complex 20%, your team gets AI-suggested replies to send in one tap. Everything in one inbox — organized, tracked, and measured.</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-[#508DFF]/10 rounded-lg px-3 py-2 text-center text-xs">
                      <div className="text-[#508DFF] font-bold">80%</div>
                      <div className="text-[#5A6B82]">AI handled</div>
                    </div>
                    <div className="bg-[#EFF35F]/10 rounded-lg px-3 py-2 text-center text-xs">
                      <div className="text-[#EFF35F] font-bold">20%</div>
                      <div className="text-[#5A6B82]">Human</div>
                    </div>
                    <div className="bg-[#0F2A47] rounded-lg px-3 py-2 text-center text-xs border border-[#508DFF]/20">
                      <div className="text-[#E8EEF7] font-bold">5x</div>
                      <div className="text-[#5A6B82]">Faster</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RESULTS / CASE STUDIES ===================== */}
      <section id="results" className="py-20 px-6 bg-[#0F2A47]/20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="Real results"
            title={<>Before. <span className="heading-accent">After.</span></>}
            subtitle="The real impact on growing businesses — data-driven, verified scenarios."
          />
          <div className="space-y-6 mt-12">
            <CaseCard
              industry="Clothing Brand — Lahore"
              before="200 inquiries per day, 15% conversion rate, 3–4 hours of manual replies"
              after="25% conversion rate, 0 hours of manual replies, +20 extra orders per day"
              metric="+$40K/day"
            />
            <CaseCard
              industry="Restaurant — Karachi"
              before="15–20 orders lost every night after 10 PM when staff went home"
              after="Zero lost orders. 24/7 order-taking. No more third-party delivery commissions."
              metric="$15K+/day saved"
            />
            <CaseCard
              industry="Clinic — Rawalpindi"
              before="Missed appointment calls all day, receptionist overwhelmed"
              after="24/7 appointment booking. No-shows dropped 50%. Significant monthly revenue uplift"
              metric="+$1.2M/mo"
            />
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="Pricing"
            title={<>14 days free. <span className="heading-accent">Then decide.</span></>}
            subtitle="No credit card required. Cancel anytime. Priced for growing businesses."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Starter"
              price="$9"
              tagline="For small businesses"
              features={["1 AI Agent", "500 conversations/month", "Basic dashboard", "Connect your number", "Daily summary"]}
            />
            <PricingCard
              name="Growth"
              price="$15"
              tagline="Most businesses choose this"
              features={["Unlimited conversations", "Full dashboard", "COD verification", "Abandoned recovery", "Daily revenue report", "Product catalog"]}
              popular
            />
            <PricingCard
              name="Pro"
              price="$25"
              tagline="For scaling brands"
              features={["Multi-agent inbox (5 staff)", "Broadcast campaigns", "Advanced analytics", "Priority support", "Custom integrations", "API access"]}
            />
          </div>
          <p className="text-center text-[#5A6B82] text-sm mt-8">
            Every plan includes a <span className="text-[#EFF35F]">14-day free trial</span>. No payment until you're satisfied.
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-20 px-6 bg-[#0F2A47]/20">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            tag="FAQ"
            title={<>Questions? <span className="heading-accent">Answered.</span></>}
            subtitle=""
          />
          <div className="space-y-4 mt-10">
            <FAQItem q="Is SellBot free?" a="You get a 14-day free trial — no credit card required. After the trial, choose Starter ($9/mo), Growth ($15/mo), or Pro ($25/mo)." />
            <FAQItem q="Do I need to change my number?" a="No! Your existing business number connects directly. Use a QR code or a 6-digit pairing code — just like linking a new device. Your customers won't notice a thing." />
            <FAQItem q="How long does setup take?" a="About 5 minutes. Connect your number, add your products, and the AI is live. No technical knowledge required." />
            <FAQItem q="What languages does the AI understand?" a="SellBot understands your customers however they write — in English, in local script, or mixed. It always replies in the same style your customer used." />
            <FAQItem q="How does it handle fake COD orders?" a="For every order, SellBot asks the customer to reply 'YES' to confirm. If there's no reply within 24 hours, the order is automatically cancelled. This eliminates 30%+ of fake orders." />
            <FAQItem q="Is my data safe?" a="Yes. All conversations are stored in an encrypted database. Your data is never shared with any third party, and it's permanently deleted when you cancel your account." />
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#508DFF]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="heading-split text-4xl md:text-6xl mb-6">
            Every missed message<br />
            <span className="heading-accent">is a missed sale.</span>
          </h2>
          <p className="text-lg text-[#8B9DB8] mb-10 max-w-xl mx-auto">
            Connect your number today. Your AI sales agent goes live in 5 minutes.
          </p>
          <Link href="/onboarding" className="btn-electric px-10 py-4 rounded-xl text-lg inline-flex items-center gap-2 animate-pulse-glow">
            Start Your 14-Day Free Trial
            <span>→</span>
          </Link>
          <p className="text-sm text-[#5A6B82] mt-4">No credit card required • 5-minute setup • Cancel anytime</p>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-[#508DFF]/10 bg-[#0A1628] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 w-6 h-6 rounded-md bg-[#508DFF] opacity-90" />
                  <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
                </div>
                <span className="text-lg font-bold">SellBot</span>
              </Link>
              <p className="text-sm text-[#5A6B82]">Made for growing businesses.</p>
            </div>
            {/* Links */}
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
                <Link href="/dashboard/connect" className="text-[#8B9DB8] hover:text-[#E8EEF7] transition block">Connect Your Number</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#508DFF]/10 pt-6 flex justify-between items-center flex-wrap gap-4">
            <p className="text-xs text-[#5A6B82]">© 2026 SellBot. All rights reserved.</p>
            <p className="text-xs text-[#5A6B82] font-mono">Trust. Technical Depth. Focus.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ============================================
   Components
   ============================================ */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#EFF35F] mb-2 heading-split">{value}</div>
      <div className="text-sm text-[#8B9DB8]">{label}</div>
    </div>
  )
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="text-center">
      <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">{tag}</div>
      <h2 className="heading-split text-3xl md:text-5xl mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function StepCard({ num, title, desc, icon }: { num: string; title: string; desc: string; icon: string }) {
  return (
    <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <span className="text-3xl font-bold text-[#508DFF]/20 font-mono group-hover:text-[#508DFF]/40 transition">{num}</span>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-[#8B9DB8] leading-relaxed">{desc}</p>
    </div>
  )
}

function MockChat({ name, msg }: { name: string; msg: string }) {
  return (
    <div className="bg-[#0A1628]/60 rounded-lg p-3 border border-[#508DFF]/10">
      <div className="text-xs text-[#508DFF] font-medium mb-1">{name}</div>
      <div className="text-xs text-[#8B9DB8] leading-relaxed">{msg}</div>
    </div>
  )
}

function CaseCard({ industry, before, after, metric }: { industry: string; before: string; after: string; metric: string }) {
  return (
    <div className="glass rounded-2xl p-6 hover:border-[#508DFF]/40 transition">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-lg font-bold">{industry}</h3>
        <span className="tag-acid px-3 py-1 rounded-full text-xs font-mono font-bold">{metric}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#5A6B82] mb-2">Before</div>
          <p className="text-sm text-[#8B9DB8]">{before}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-[#EFF35F] mb-2">After</div>
          <p className="text-sm text-[#E8EEF7]">{after}</p>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ name, price, tagline, features, popular }: { name: string; price: string; tagline: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`rounded-2xl p-8 transition ${popular ? 'glass border-2 border-[#508DFF]/40 relative shadow-xl shadow-[#508DFF]/10' : 'glass hover:border-[#508DFF]/30'}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EFF35F] text-[#0A1628] text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-xs text-[#5A6B82] mb-4">{tagline}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold heading-split">{price}</span>
        <span className="text-[#8B9DB8] text-sm">/month</span>
      </div>
      <ul className="space-y-3 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[#E8EEF7]">
            <span className="text-[#EFF35F] mt-0.5">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/onboarding"
        className={`mt-8 w-full py-3 rounded-xl font-medium text-center block transition ${
          popular ? 'btn-electric' : 'btn-ghost'
        }`}
      >
        {popular ? 'Start Free Trial →' : 'Choose Plan →'}
      </Link>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="glass rounded-xl p-6 hover:border-[#508DFF]/30 transition">
      <h4 className="font-semibold text-[#E8EEF7] mb-2">{q}</h4>
      <p className="text-sm text-[#8B9DB8] leading-relaxed">{a}</p>
    </div>
  )
}
