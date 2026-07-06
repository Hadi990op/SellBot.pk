import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'About — SellBot.pk',
  description: 'SellBot.pk ki kahani — Pakistani WhatsApp businesses ka AI sales agent.',
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
            Pakistani businesses<br />
            <span className="heading-accent">AI se aage badhenge.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            SellBot.pk Pakistan ke 21 million WhatsApp businesses ke liye banaya gaya — taake koi sale miss na ho, koi customer wait na kare, aur har business owner so bhi sake ke uska AI agent kaam kar raha hai.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 bg-[#0F2A47]/20">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-10">
            <div className="text-xs uppercase tracking-widest text-[#EFF35F] font-medium mb-4">Mission</div>
            <p className="text-xl md:text-2xl leading-relaxed text-[#E8EEF7]">
              Pakistan me har business — chhote ya bade — AI ka fayda uthaye, bina tech seekhe.
              SellBot ek bridge hai: <span className="text-[#508DFF] font-medium">WhatsApp pe AI sales agent</span> jo Roman Urdu me baat karta hai, orders confirm karta hai, aur owner ko revenue report bhejta hai.
              Sab free se shuru. Sab simple. Sab Pakistani.
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
              desc="Customer data encrypted. Owner conversations private. Koi third-party sharing nahi. Pakistani businesses ke data Pakistani businesses ka."
            />
            <ValueCard
              icon="🔧"
              title="Technical Depth"
              desc="Multi-provider AI failover. Neon Postgres. Baileys WhatsApp protocol. Real engineering, real reliability — na ke sirf wrapper."
            />
            <ValueCard
              icon="🎯"
              title="Focus"
              desc="Ek problem, ek solution. WhatsApp pe missed sales = lost revenue. SellBot sirf isi ko solve karta hai — perfectly."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-[#0F2A47]/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">21M+</div>
            <div className="text-sm text-[#8B9DB8] mt-1">WhatsApp businesses in Pakistan</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">40%</div>
            <div className="text-sm text-[#8B9DB8] mt-1">Revenue lost to ignored leads</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#EFF35F] heading-split">PKR 15K</div>
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
              Pakistani businesses har din<br /><span className="heading-accent">paise khote hain.</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold mb-1">21M WhatsApp Business accounts</h3>
                <p className="text-sm text-[#8B9DB8]">Pakistan me world's highest ratio — har business WhatsApp pe customer chat karta hai. Lekin koi 24/7 reply nahi karta.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">💤</span>
              <div>
                <h3 className="font-semibold mb-1">Raat ke 10 baje staff chala jata hai</h3>
                <p className="text-sm text-[#8B9DB8]">Karachi restaurant 15-20 orders/night lose karta hai. Lahore clothing brand 3-4 ghante manual reply me lagti hai.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold mb-1">English AI tools Roman Urdu nahi samajhte</h3>
                <p className="text-sm text-[#8B9DB8]">ChatGPT, Meta AI — sab English-first. Pakistani customer 'Bhai price kya hai?' likhta hai, AI bhatk jata hai.</p>
              </div>
            </div>
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-2xl">💵</span>
              <div>
                <h3 className="font-semibold mb-1">30%+ fake COD orders</h3>
                <p className="text-sm text-[#8B9DB8]">Cash on Delivery pe customer cancel karta hai, courier charges business bear karta hai. PKR 5-15K/mo waste.</p>
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
            Aap bhi <span className="heading-accent"> SellBot family</span> me shamil ho.
          </h2>
          <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base inline-block">
            14 Din Free Trial Shuru Karein →
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
