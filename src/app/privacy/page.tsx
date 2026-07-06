import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'Privacy Policy — SellBot',
  description: 'SellBot privacy policy — how we collect, use, and protect your data.',
  openGraph: {
    title: 'Privacy Policy — SellBot',
    description: 'How we collect, use, and protect your data.',
  },
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
          <PrivacySection title="1. Data We Collect">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li><span className="text-[#E8EEF7]">Business info:</span> business name, industry, owner name, phone number</li>
              <li><span className="text-[#E8EEF7]">Product catalog:</span> product names, prices, descriptions, sizes</li>
              <li><span className="text-[#E8EEF7]">Conversations:</span> customer messages, AI replies, order details</li>
              <li><span className="text-[#E8EEF7]">Customer info:</span> phone number, name, order history</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="2. How We Use Your Data">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li>To train your AI agent to provide better replies over time</li>
              <li>To track orders and generate revenue reports</li>
              <li>To send follow-up messages for abandoned inquiries</li>
              <li>To improve product recommendations for your customers</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="3. Data Storage">
            <p className="text-[#8B9DB8]">
              SellBot stores all data in an encrypted database with SSL/TLS encryption for data in transit and at rest.
              Your business data is isolated to your account — it is never shared with other businesses.
            </p>
          </PrivacySection>

          <PrivacySection title="4. Third-Party Services">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li><span className="text-[#E8EEF7]">Messaging protocol provider:</span> connects your number to your messaging app</li>
              <li><span className="text-[#E8EEF7]">AI language model provider:</span> generates replies (conversations are encrypted in transit)</li>
              <li><span className="text-[#E8EEF7]">Database provider:</span> encrypted data storage with SSL</li>
            </ul>
            <p className="mt-3 text-[#8B9DB8]">
              We never sell your data to third parties. AI providers only have temporary access to process conversations —
              they do not store your data.
            </p>
          </PrivacySection>

          <PrivacySection title="5. Data Retention">
            <p className="text-[#8B9DB8]">
              When you cancel your account, all data is permanently deleted within 30 days. Data collected during a free trial
              is deleted when the trial ends (unless you upgrade to a paid plan).
            </p>
          </PrivacySection>

          <PrivacySection title="6. Your Rights">
            <ul className="list-disc list-inside space-y-2 text-[#8B9DB8]">
              <li>You can export your data at any time</li>
              <li>You can delete your account and all associated data</li>
              <li>You can opt out of AI training with your data</li>
              <li>You can access, update, or delete customer data</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="7. Security">
            <p className="text-[#8B9DB8]">
              We use SSL/TLS encryption for all data in transit and at rest. Access tokens are stored securely.
              We conduct regular security audits. While no system is 100% secure, we maintain transparency about our practices.
            </p>
          </PrivacySection>

          <PrivacySection title="8. Contact">
            <p className="text-[#8B9DB8]">
              Have a privacy-related question? Visit our <Link href="/contact" className="text-[#508DFF] hover:text-[#6FA3FF] transition">contact page</Link> to
              send us a message.
            </p>
          </PrivacySection>
        </div>
      </section>

      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/onboarding" className="btn-electric px-8 py-3.5 rounded-xl text-base inline-block">
            Start Free Trial →
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
