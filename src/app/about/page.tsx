import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'About — SellBot',
  description: 'The SellBot story — an AI sales agent for businesses that sell through chat. Never miss a sale again.',
  openGraph: {
    title: 'About — SellBot',
    description: 'The SellBot story — an AI sales agent for businesses that sell through chat. Never miss a sale again.',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">Our Story</div>
          <h1 className="heading-split text-4xl md:text-6xl mb-6">
            Every business<br />
            <span className="heading-accent">deserves an AI agent.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            SellBot was built for businesses that sell through chat — so no sale is missed, no customer is left waiting, and every business owner can rest easy knowing their AI agent is working around the clock.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 bg-[#0F2A47]/20">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10">
            <div className="text-xs uppercase tracking-widest text-[#EFF35F] font-medium mb-4">Mission</div>
            <p className="text-xl md:text-2xl leading-relaxed text-[#E8EEF7]">
              Every business — small or large — should benefit from AI, without learning any technology.
              SellBot is a bridge: <span className="text-[#508DFF] font-medium">an AI sales agent on your messaging app</span> that talks to your customers naturally, confirms orders, and sends revenue reports to the owner.
              Start free. Keep it simple. Built for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">Values</div>
            <h2 className="heading-split text-3xl md:text-5xl">
              Trust. <span className="heading-accent">Technical Depth. Focus.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              icon="🤝"
              title="Trust"
              desc="Customer data is encrypted. Owner conversations stay private. No third-party sharing. Your business data belongs to your business."
            />
            <ValueCard
              icon="🔧"
              title="Technical Depth"
              desc="Multi-provider AI failover. Encrypted database. Reliable messaging integration. Real engineering, real reliability — not just a wrapper."
            />
            <ValueCard
              icon="🎯"
              title="Focus"
              desc="One problem, one solution. Missed sales on chat = lost revenue. SellBot solves exactly this — perfectly."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-[#0F2A47]/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">Millions</div>
            <div className="text-sm text-[#8B9DB8] mt-1">Businesses miss sales every day</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">40%</div>
            <div className="text-sm text-[#8B9DB8] mt-1">Revenue lost to ignored leads</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">High</div>
            <div className="text-sm text-[#8B9DB8] mt-1">Average monthly value per business</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">14</div>
            <div className="text-sm text-[#8B9DB8] mt-1">Days free trial — no card</div>
          </div>
        </div>
      </section>

      {/* Problem we solve */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">The Problem</div>
            <h2 className="heading-split text-3xl md:text-5xl mb-4">
              Businesses lose money<br /><span className="heading-accent">every single day.</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold mb-1">Countless chat-based businesses</h3>
                <p className="text-sm text-[#8B9DB8]">Most businesses handle customers through chat. But almost none reply 24/7 — and customers expect instant responses.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">💤</span>
              <div>
                <h3 className="font-semibold mb-1">No one answers after hours</h3>
                <p className="text-sm text-[#8B9DB8]">Staff goes home at 10pm. Customers message at 11pm. No reply means lost orders — every single night.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold mb-1">Generic AI tools miss the context</h3>
                <p className="text-sm text-[#8B9DB8]">Most AI tools are built for English first. They misunderstand local phrasing, miss intent, and reply like robots instead of a real person.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">💵</span>
              <div>
                <h3 className="font-semibold mb-1">30%+ fake cash-on-delivery orders</h3>
                <p className="text-sm text-[#8B9DB8]">Customers cancel at the door, and the business absorbs courier charges. Thousands wasted every month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="heading-split text-3xl md:text-5xl mb-6">
            Join the <span className="heading-accent"> SellBot family</span> today.
          </h2>
          <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base inline-block">
            Start Your 14-Day Free Trial →
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}

function ValueCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-[#8B9DB8] leading-relaxed">{desc}</p>
    </div>
  )
}
