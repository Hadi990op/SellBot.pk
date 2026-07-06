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
            Questions? <span className="heading-accent">Let's talk.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            Have a question about the product? Need a demo? Want a custom plan? Fill out the form below and we'll get back to you.
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
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p className="text-[#8B9DB8] text-sm">Your message has been received. We'll reply within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', business: '', phone: '', message: '' }) }}
                  className="btn-ghost mt-6 px-6 py-2 rounded-lg text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Business Name</label>
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    placeholder="Your business"
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8B9DB8] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your phone number"
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
                    placeholder="Your question..."
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-3 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition resize-none"
                  />
                </div>
                <button type="submit" className="btn-electric w-full py-3 rounded-lg font-medium">
                  Send →
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-bold text-lg mb-2">Direct Message</h3>
              <p className="text-sm text-[#8B9DB8] mb-3">You can also reach us directly:</p>
              <a
                href="mailto:hello@sellbot.app"
                className="text-[#508DFF] font-mono text-sm hover:text-[#6FA3FF] transition"
              >
                hello@sellbot.app
              </a>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-sm text-[#8B9DB8]">We guarantee a reply within 24 hours. Usually within 1-2 hours during business hours.</p>
            </div>
            <div className="glass rounded-2xl p-8">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2">Built for Growth</h3>
              <p className="text-sm text-[#8B9DB8]">SellBot is built by a team focused on one thing: helping businesses capture more sales through AI automation.</p>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
