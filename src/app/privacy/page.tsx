import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'Privacy Policy — SellBot.pk',
  description: 'SellBot.pk privacy policy — aapka data kaise use hota hai.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <MarketingNav />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">Legal</div>
          <h1 className="heading-split text-4xl md:text-5xl mb-4">
            Privacy <span className="heading-accent">Policy</span>
          </h1>
          <p className="text-sm text-[#5A6B82]">Last updated: July 6, 2026</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <PrivacySection title="1. Hum kya data collect karte hain">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li><span className="text-[#E8EEF7]">Business info:</span> business name, industry, owner name, WhatsApp number</li>
              <li><span className="text-[#E8EEF7]">Product catalog:</span> product names, prices, descriptions, sizes</li>
              <li><span className="text-[#E8EEF7]">Conversations:</span> customer messages, AI replies, order details</li>
              <li><span className="text-[#E8EEF7]">Customer info:</span> phone number, name (from WhatsApp), order history</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="2. Data kaise use hota hai">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li>AI agent ki training ke liye — taake better replies de sake</li>
              <li>Orders track karne aur reports generate karne ke liye</li>
              <li>Abandoned inquiry follow-ups bhejne ke liye</li>
              <li>Product recommendations improve karne ke liye</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="3. Data kahan store hota hai">
            <p className="text-[#8B9DB8]">
              SellBot encrypted database (Neon Postgres, SSL/TLS) me data store karta hai. Conversations aur business data
              sirf aapke business se related hai — kisi aur business ke saath share nahi hota.
            </p>
          </PrivacySection>

          <PrivacySection title="4. Third-party services">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li><span className="text-[#E8EEF7]">Baileys (WhatsApp Web protocol):</span> WhatsApp se connect karne ke liye</li>
              <li><span className="text-[#E8EEF7]">Groq / OpenRouter:</span> AI replies generate karne ke liye (conversations encrypted bheji jati hain)</li>
              <li><span className="text-[#E8EEF7]">Neon Postgres:</span> Data storage (encrypted, SSL)</li>
            </ul>
            <p className="mt-3 text-[#8B9DB8]">
              Hum kabhi bhi aapka data third parties ko sell nahi karte. AI providers sirf conversation process karne ke liye
              temporary access rakhte hain — wo data store nahi karte.
            </p>
          </PrivacySection>

          <PrivacySection title="5. Data retention">
            <p className="text-[#8B9DB8]">
              Aap account cancel karne pe saara data 30 din me permanently delete kar diya jata hai. Trial ke dauran
              collected data bhi trial khatam hone pe delete ho jata hai (agar paid plan me upgrade na karein).
            </p>
          </PrivacySection>

          <PrivacySection title="6. Aapke rights">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li>Aap kabhi bhi apna data export kar sakte hain</li>
              <li>Aap apna account aur saara data delete kar sakte hain</li>
              <li>Aap AI training ke liye apna data opt-out kar sakte hain</li>
              <li>Aap customer data access/update/delete kar sakte hain</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="7. Security">
            <p className="text-[#8B9DB8]">
              Hum SSL/TLS encryption use karte hain (data in transit + at rest). Access tokens securely store hote hain.
              Hum regular security audits karte hain. Lekin koi system 100% secure nahi — isliye hum transparency rakhte hain.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Contact">
            <p className="text-[#8B9DB8]">
              Privacy se related koi sawal? <Link href="/contact" className="text-[#508DFF] hover:text-[#6FA3FF] transition">Contact page</Link> se
              message karein ya WhatsApp pe direct baat karein.
            </p>
          </PrivacySection>
        </div>
      </section>

      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base inline-block">
            Free Trial Shuru Karein →
          </Link>
        </div>
      </div>

      <MarketingFooter />
    </main>
  )
}

function PrivacySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-xl font-bold mb-4 text-[#E8EEF7]">{title}</h2>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
