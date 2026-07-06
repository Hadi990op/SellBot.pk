'use client'

import { useState } from 'react'
import { MarketingNav, MarketingFooter } from '../marketing'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">Contact</div>
          <h1 className="heading-split text-4xl md:text-6xl mb-6">
            Sawal? <span className="heading-accent">Baat karte hain.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            Product ke baare me koi sawal? Demo chahiye? Custom plan? Niche form bharein ya WhatsApp pe direct message karein.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="glass rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Shukriya!</h3>
                <p className="text-[#8B9DB8] text-sm">Aapka message mil gaya. Hum 24 ghante me reply karenge.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', business: '', phone: '', message: '' }) }}
                  className="btn-ghost mt-6 px-6 py-2 rounded-lg text-sm"
                >
                  Naya message bhejein
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Naam</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Aapka naam"
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Business naam</label>
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    placeholder="Aapka business"
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">WhatsApp number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="923001234567"
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Aapka sawal..."
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition resize-none"
                  />
                </div>
                <button type="submit" className="btn-electric w-full py-3 rounded-lg font-medium">
                  Bhejein →
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-sm text-[#8B9DB8] mb-3">Direct message bhi kar sakte hain:</p>
              <a
                href="https://wa.me/923001234567"
                className="text-[#508DFF] font-mono text-sm hover:text-[#6FA3FF] transition"
              >
                +92 300 1234567
              </a>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Response time</h3>
              <p className="text-sm text-[#8B9DB8]">Form ya WhatsApp — dono pe 24 ghante me reply guaranteed. Aksar 1-2 ghante me.</p>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">🇵🇰</div>
              <h3 className="font-bold text-lg mb-2">Made in Pakistan</h3>
              <p className="text-sm text-[#8B9DB8]">SellBot.pk Pakistani developers ne banaya hai. Local support, local language, local understanding.</p>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
