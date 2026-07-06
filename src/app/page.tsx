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
              SellBot<span className="text-[#508DFF]">.pk</span>
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
            Pakistan's first AI WhatsApp sales agent
          </div>

          {/* Headline — split weight (Guardbase signature) */}
          <h1 className="heading-split text-5xl md:text-7xl mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Har WhatsApp message<br />
            <span className="heading-accent">ek sale ban jaye.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#8B9DB8] max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            AI agent jo aapke WhatsApp pe <span className="text-[#E8EEF7] font-medium">24/7 Roman Urdu me</span> customers ko reply karta hai, orders confirm karta hai, aur subah aapko revenue report bhejta hai. Aap so rahe ho, SellBot kaam kar raha hai.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base">
              14 Din Free Trial Shuru Karein →
            </Link>
            <a href="#how" className="btn-ghost px-8 py-3.5 rounded-xl text-base">
              ↓ Kaise Kaam Karta Hai
            </a>
          </div>
          <p className="text-sm text-[#5A6B82] animate-fade-up" style={{ animationDelay: '0.4s' }}>
            Koi credit card nahi • QR code se 5 minute me connect • Cancel kabhi bhi
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
                <div className="ml-4 text-xs text-[#5A6B82] font-mono">dashboard.sellbot.pk</div>
              </div>
              {/* Mock dashboard */}
              <div className="p-6 grid grid-cols-3 gap-3 text-left">
                <div className="col-span-1 space-y-3">
                  <div className="text-xs text-[#5A6B82] uppercase tracking-wider">Aaj</div>
                  <div className="text-2xl font-bold text-[#EFF35F]">12 orders</div>
                  <div className="text-lg font-bold text-[#508DFF]">PKR 47K</div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-3/4 rounded-full bg-[#508DFF]" /></div>
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-1/2 rounded-full bg-[#508DFF]" /></div>
                    <div className="h-2 rounded-full bg-[#508DFF]/20"><div className="h-2 w-2/3 rounded-full bg-[#EFF35F]" /></div>
                  </div>
                </div>
                <div className="col-span-2 space-y-3">
                  <div className="text-xs text-[#5A6B82] uppercase tracking-wider">Live Conversations</div>
                  <MockChat name="Gulzar Fabrics" msg="Customer: Black shirt M size available? → AI: Haan ji! M available hai, PKR 1,200. COD available. Order karne ke liye YES reply karein ✨" />
                  <MockChat name="Lahore Eats" msg="Customer: 2x biryani delivery → AI: Confirmed! 2x biryani, PKR 800, delivery 30 min. Address share karein 🌟" />
                  <MockChat name="Dr. Khan Clinic" msg="Customer: Appointment tomorrow? → AI: 2pm aur 4pm available. Kaunsa suit karta hai? 😊" />
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
              <span>🇵🇰 21M+ WhatsApp Business accounts in Pakistan</span>
              <span className="text-[#508DFF]">•</span>
              <span>40% revenue lost to ignored leads</span>
              <span className="text-[#508DFF]">•</span>
              <span>24/7 never sleeps</span>
              <span className="text-[#508DFF]">•</span>
              <span>PKR 15K-25K/mo plans</span>
              <span className="text-[#508DFF]">•</span>
              <span>14 din free trial</span>
              <span className="text-[#508DFF]">•</span>
              <span>🇵🇰 21M+ WhatsApp Business accounts in Pakistan</span>
              <span className="text-[#508DFF]">•</span>
              <span>40% revenue lost to ignored leads</span>
              <span className="text-[#508DFF]">•</span>
              <span>24/7 never sleeps</span>
              <span className="text-[#508DFF]">•</span>
              <span>PKR 15K-25K/mo plans</span>
              <span className="text-[#508DFF]">•</span>
              <span>14 din free trial</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="21M+" label="WhatsApp Business users in Pakistan" />
          <StatCard value="40%" label="Revenue lost to unanswered messages" />
          <StatCard value="24/7" label="SellBot never sleeps" />
          <StatCard value="0" label="Credit card required" />
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="py-20 px-6 bg-[#0F2A47]/20">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="How it works"
            title={<>5 minute me <span className="heading-accent">live.</span></>}
            subtitle="Aapka existing WhatsApp number connect karein, catalog add karein, aur AI auto-pilot pe."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <StepCard
              num="01"
              title="WhatsApp Connect"
              desc="QR code scan ya 6-digit pairing code se apna WhatsApp connect karein. Bilkul free — koi Meta API ya payment nahi."
              icon="📱"
            />
            <StepCard
              num="02"
              title="Catalog Add Karein"
              desc="Products add karein — naam, price, sizes, description. SellBot sab yaad rakhega aur customers ko bata dega."
              icon="🏷️"
            />
            <StepCard
              num="03"
              title="Sales Auto-Pilot"
              desc="Customer message kare → AI Roman Urdu me reply → order confirm → subah aapko revenue report WhatsApp pe."
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
            title={<>Competitors se <span className="heading-accent">kya behtar?</span></>}
            subtitle="7 features jo Pakistani SMBs ke liye banaye gaye — Roman Urdu, COD, revenue reports, aur zyada."
          />
          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {/* Large feature — Roman Urdu */}
            <div className="glass rounded-2xl p-8 md:col-span-2 md:row-span-1 hover:border-[#508DFF]/40 transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🇵🇰</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Roman Urdu First</h3>
                  <p className="text-[#8B9DB8] text-sm leading-relaxed">'Bhai black shirt M size ka price kya hai?' — SellBot native samjhta hai. English-first tools (ChatGPT, Meta AI) Pakistani customer ki language nahi samajhte. Hum samajhte hain.</p>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">Roman Urdu</span>
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">Urdu script</span>
                    <span className="tag-acid px-3 py-1 rounded-full text-xs">English mix</span>
                  </div>
                </div>
              </div>
            </div>
            {/* COD Verification */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">💵</div>
              <h3 className="text-xl font-bold mb-2">COD Verification</h3>
              <p className="text-[#8B9DB8] text-sm">Fake COD orders 30%+ hote hain. SellBot har order verify karta hai — PKR 5-15K/mo bachat.</p>
            </div>
            {/* Daily Report */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Daily Report</h3>
              <p className="text-[#8B9DB8] text-sm">Har subah 9 baje WhatsApp pe: 'Kal 12 order, PKR 47,000 — aap so rahe the.'</p>
            </div>
            {/* Abandoned Recovery */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Abandoned Recovery</h3>
              <p className="text-[#8B9DB8] text-sm">Customer ne 'sochta hu' kaha? SellBot 4 ghante baad smart follow-up karta hai.</p>
            </div>
            {/* Self-learning */}
            <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2">Aapki Tarah Baat</h3>
              <p className="text-[#8B9DB8] text-sm">Owner ke past chats se seekhta hai — aapka tone, aapke words, aapki style.</p>
            </div>
            {/* Multi-agent */}
            <div className="glass rounded-2xl p-8 md:col-span-2 hover:border-[#508DFF]/40 transition">
              <div className="flex items-start gap-4">
                <div className="text-4xl">👥</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Multi-Agent Inbox</h3>
                  <p className="text-[#8B9DB8] text-sm leading-relaxed">1 se 5 staff tak scale. AI 80% conversations handle karta hai, complex 20% me humans ko AI-suggested replies milte hain. Sab ek inbox me — organized, tracked, measured.</p>
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
            subtitle="Pakistani businesses me real impact — data-driven, verified scenarios."
          />
          <div className="space-y-6 mt-12">
            <CaseCard
              industry="Clothing Brand — Lahore"
              before="200 WhatsApp inquiries/day, 15% conversion, 3-4 hours manual replies"
              after="25% conversion, 0 hours manual, +20 extra orders/day = +PKR 40,000/day"
              metric="+PKR 40K/day"
            />
            <CaseCard
              industry="Restaurant — Karachi"
              before="15-20 orders/night lost after 10pm when staff goes home"
              after="Zero lost orders. 24/7 order-taking. Foodpanda commission saved."
              metric="PKR 15K+/day saved"
            />
            <CaseCard
              industry="Clinic — Rawalpindi"
              before="Missed appointment calls all day, receptionist overwhelmed"
              after="24/7 appointment booking. No-shows dropped 50%. +PKR 1.2M/mo uplift"
              metric="+PKR 1.2M/mo"
            />
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="Pricing"
            title={<>14 din free. <span className="heading-accent">Phir choose karein.</span></>}
            subtitle="Koi credit card nahi. Cancel kabhi bhi. Pakistani businesses ke liye priced."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Starter"
              price="9,000"
              tagline="Chhote businesses ke liye"
              features={["1 AI Agent", "500 conversations/month", "Basic dashboard", "Roman Urdu support", "WhatsApp connect"]}
            />
            <PricingCard
              name="Growth"
              price="15,000"
              tagline="Most businesses choose this"
              features={["Unlimited conversations", "Full dashboard", "COD verification", "Abandoned recovery", "Daily revenue report", "Product catalog"]}
              popular
            />
            <PricingCard
              name="Pro"
              price="25,000"
              tagline="Scale karne wale brands"
              features={["Multi-agent inbox (5 staff)", "Broadcast campaigns", "Advanced analytics", "Priority support", "Custom integrations", "API access"]}
            />
          </div>
          <p className="text-center text-[#5A6B82] text-sm mt-8">
            Sab plans me <span className="text-[#EFF35F]">14 din free trial</span> included. Koi payment nahi jab tak aap satisfied na ho.
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-20 px-6 bg-[#0F2A47]/20">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            tag="FAQ"
            title={<>Sawal? <span className="heading-accent">Jawab.</span></>}
            subtitle=""
          />
          <div className="space-y-4 mt-10">
            <FAQItem q="Kya SellBot free hai?" a="14 din ka free trial hai — koi credit card nahi. Trial ke baad Starter (PKR 9K/mo), Growth (PKR 15K/mo), ya Pro (PKR 25K/mo) choose karein." />
            <FAQItem q="Mera WhatsApp number change karna padega?" a="Nahi! Aapka existing WhatsApp Business ya personal number connect hota hai. QR code ya 6-digit pairing code se — jaise WhatsApp Web. Customers ko koi farak nahi parta." />
            <FAQItem q="Koi Meta approval ya payment chahiye?" a="Bilkul nahi. SellBot WhatsApp Web protocol use karta hai — koi Meta Business API, koi verification, koi monthly fee Meta ko. Bilkul free connect." />
            <FAQItem q="AI Roman Urdu samajhta hai?" a="Haan! SellBot Pakistani customers ke liye banaya gaya hai. Roman Urdu, Urdu script, aur English mix — sab samajhta hai aur usi language me reply karta hai." />
            <FAQItem q="Fake COD orders se kaise bachata hai?" a="Har order pe SellBot customer se 'YES' confirm mangta hai. 24 ghante me reply na aane pe order cancel. Is se 30%+ fake orders eliminate ho jate hain." />
            <FAQItem q="Mera data safe hai?" a="Haan. Conversations encrypted database me store hote hain. Aapka data kabhi third party ke saath share nahi hota. Cancel karne pe delete kar diya jata hai." />
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#508DFF]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="heading-split text-4xl md:text-6xl mb-6">
            Har miss hua message<br />
            <span className="heading-accent">ek miss hui sale hai.</span>
          </h2>
          <p className="text-lg text-[#8B9DB8] mb-10 max-w-xl mx-auto">
            Aaj hi apna WhatsApp connect karein. 5 minute me AI sales agent live.
          </p>
          <Link href="/onboarding" className="btn-electric px-10 py-4 rounded-xl text-lg inline-flex items-center gap-2 animate-pulse-glow">
            14 Din Free Trial Shuru Karein
            <span>→</span>
          </Link>
          <p className="text-sm text-[#5A6B82] mt-4">Koi credit card nahi • 5 min me setup • Cancel kabhi bhi</p>
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
                <span className="text-lg font-bold">SellBot<span className="text-[#508DFF]">.pk</span></span>
              </Link>
              <p className="text-sm text-[#5A6B82]">Pakistani businesses ke liye banaya gaya. 🇵🇰</p>
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
        <span className="text-4xl font-bold heading-split">PKR {price}</span>
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
        {popular ? 'Free Trial Shuru Karein →' : 'Choose Plan →'}
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
