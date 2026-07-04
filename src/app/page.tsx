import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="text-xl font-bold text-gray-900">SellBot<span className="text-green-600">.pk</span></span>
        </div>
        <Link href="/onboarding" className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition">
          Free Trial Shuru Karein
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Aapke WhatsApp pe ek AI sales agent<br />
          jo <span className="text-green-600">24/7 order le</span>,<br />
          aap <span className="text-green-600">so rahe hain</span> tab bhi.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Pakistani businesses har din 40% leads WhatsApp pe lose karte hain — kyunki koi reply nahi karta.
          SellBot aapke customer ko <strong>Roman Urdu me</strong> instant reply karta hai, order confirm karta hai,
          aur subah aapko revenue report bhejta hai.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/onboarding" className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200">
            14 Din Free Trial →
          </Link>
          <a href="#how" className="border-2 border-gray-300 px-8 py-3 rounded-xl font-semibold text-lg text-gray-700 hover:border-gray-400 transition">
            Kaise Kaam Karta Hai?
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">Koi credit card nahi • Cancel kabhi bhi • 5 minute me setup</p>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold text-green-600">21M+</div>
          <div className="text-sm text-gray-500">WhatsApp Business accounts in Pakistan</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">40%</div>
          <div className="text-sm text-gray-500">Revenue lost to ignored WhatsApp leads</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">24/7</div>
          <div className="text-sm text-gray-500">SellBot kabhi nahi sota</div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Kaise Kaam Karta Hai?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Connect Karein</h3>
            <p className="text-gray-600 text-sm">Aapka existing WhatsApp Business number connect karein. Koi naya number nahi. Customers ko koi farak nahi parega.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Products Add Karein</h3>
            <p className="text-gray-600 text-sm">Catalog add karein — naam, price, sizes. SellBot sab yaad rakhega aur customers ko bata dega.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="font-semibold text-lg mb-2">Sales Auto-Pilot</h3>
            <p className="text-gray-600 text-sm">Customer message kare → SellBot Roman Urdu me reply → order confirm → aapko subah report.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Competitors Se Behtar Kaise?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature icon="🇵🇰" title="Roman Urdu First" desc="'Bhai price kya hai?' — native samjhta hai. English-first tools nahi samajhte." />
            <Feature icon="💵" title="COD Verification" desc="Fake COD orders 30%+ hote hain. SellBot har order verify karta hai — PKR 5-15K/month bachat." />
            <Feature icon="📊" title="Daily Revenue Report" desc="Har subah 9 baje WhatsApp pe: 'Kal 12 order, PKR 47,000 — aap so rahe the.'" />
            <Feature icon="🔄" title="Abandoned Recovery" desc="Customer ne 'sochta hu' kaha? SellBot 4 ghante baad smart follow-up karta hai." />
            <Feature icon="🧠" title="Aapki Tarah Baat" desc="Owner ke past chats se seekhta hai — aapka tone, aapke words, aapki style." />
            <Feature icon="📱" title="Multi-Agent Inbox" desc="1 se 5 staff tak scale. AI 80% handle, complex 20% me humans ko AI-suggested replies." />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Real Results</h2>
        <div className="space-y-6">
          <CaseCard
            industry="Clothing Brand (Lahore)"
            before="200 WhatsApp inquiries/day, 15% conversion, 3-4 hours manual replies"
            after="25% conversion, 0 hours manual, +20 extra orders/day = +PKR 40,000/day"
          />
          <CaseCard
            industry="Restaurant (Karachi)"
            before="15-20 orders/night lost after 10pm when staff goes home"
            after="Zero lost orders. 24/7 order-taking. Foodpanda commission saved."
          />
          <CaseCard
            industry="Clinic (Rawalpindi)"
            before="Missed appointment calls all day, receptionist busy"
            after="24/7 appointment booking. No-shows dropped 50%."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
          <p className="text-center text-gray-500 mb-12">14 din free trial. Koi credit card nahi.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              name="Starter"
              price="9,000"
              features={["1 AI Agent", "500 conversations/month", "Basic dashboard", "Roman Urdu support"]}
            />
            <PricingCard
              name="Growth"
              price="15,000"
              features={["Unlimited conversations", "Full dashboard", "COD verification", "Abandoned recovery", "Daily report"]}
              popular
            />
            <PricingCard
              name="Pro"
              price="25,000"
              features={["Multi-agent inbox", "Broadcast campaigns", "Analytics", "Priority support", "Custom integrations"]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Aaj hi shuru karein</h2>
        <p className="text-green-100 mb-8">Har miss hua WhatsApp message ek miss hui sale hai.</p>
        <Link href="/onboarding" className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
          14 Din Free Trial Shuru Karein →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>SellBot.pk — Pakistani businesses ke liye banaya gaya. 🇵🇰</p>
        <p className="mt-2">© 2026 SellBot.pk. All rights reserved.</p>
      </footer>
    </main>
  )
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

function CaseCard({ industry, before, after }: { industry: string; before: string; after: string }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6 bg-white">
      <h3 className="font-bold text-lg mb-4">{industry}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-red-500 font-medium text-sm mb-1">❌ Before</div>
          <p className="text-gray-600 text-sm">{before}</p>
        </div>
        <div>
          <div className="text-green-600 font-medium text-sm mb-1">✅ After</div>
          <p className="text-gray-600 text-sm">{after}</p>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ name, price, features, popular }: { name: string; price: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`rounded-xl p-6 ${popular ? 'border-2 border-green-600 bg-white shadow-lg relative' : 'border border-gray-200 bg-white'}`}>
      {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</div>}
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <div className="mb-4"><span className="text-3xl font-bold">PKR {price}</span><span className="text-gray-500 text-sm">/month</span></div>
      <ul className="space-y-2 text-sm text-gray-600">
        {features.map((f, i) => <li key={i} className="flex items-start gap-2"><span className="text-green-600">✓</span> {f}</li>)}
      </ul>
    </div>
  )
}
