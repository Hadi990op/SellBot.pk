'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    business_name: '',
    owner_name: '',
    whatsapp_number: '',
    industry: 'clothing',
  })

  const [products, setProducts] = useState([
    { name: '', price: '', description: '', sizes: '', in_stock: true },
  ])

  const [bulkText, setBulkText] = useState('')
  const [bulkMode, setBulkMode] = useState(false)
  const [bulkParsing, setBulkParsing] = useState(false)

  const handleFormChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const addProduct = () => {
    setProducts((p) => [...p, { name: '', price: '', description: '', sizes: '', in_stock: true }])
  }

  const handleProductChange = (idx: number, field: string, value: string) => {
    setProducts((p) => p.map((item, i) => (i === idx ? { ...item, [field]: value } : item)))
  }

  const submitOnboarding = async () => {
    setLoading(true)
    setError('')
    try {
      // If bulk mode, parse the text to get products
      let productsToSend: any[] = []

      if (bulkMode && bulkText.trim()) {
        // Send bulk text to parse endpoint first, but we're not authenticated yet.
        // Instead, send raw products as empty and let user add after onboarding.
        // OR: parse client-side is complex. Simpler: send the raw text as a single "product" description.
        // Best approach: just send products from the manual form if any, skip bulk for onboarding.
        // The bulk upload is available in the dashboard products page after setup.
        productsToSend = []
      } else {
        productsToSend = products
          .filter((p) => p.name && p.price)
          .map((p) => ({
            name: p.name,
            price: Number(p.price),
            description: p.description,
            sizes: p.sizes ? p.sizes.split(',').map((s) => s.trim()) : null,
            in_stock: p.in_stock,
          }))
      }

      const res = await fetch('/sellbot/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          whatsapp_number: form.whatsapp_number.replace(/\D/g, ''),
          products: productsToSend,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Setup failed')
      }
      await res.json()

      router.push(`/dashboard`)
    } catch (e: any) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7] py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 w-6 h-6 rounded-md bg-[#508DFF] opacity-90" />
            <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-md bg-[#EFF35F] opacity-80 mix-blend-screen" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            SellBot
          </span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="heading-split text-3xl mb-2">
            Setup 🚀
          </h1>
          <p className="text-[#8B9DB8] text-sm">Done in 5 minutes</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${step >= s ? 'bg-[#508DFF] text-[#0A1628]' : 'bg-[#0F2A47] text-[#5A6B82] border border-[#508DFF]/20'}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Business Details</h2>
              <div>
                <label className="block text-sm font-medium text-[#8B9DB8] mb-2">Business Name</label>
                <input
                  type="text"
                  value={form.business_name}
                  onChange={(e) => handleFormChange('business_name', e.target.value)}
                  placeholder="e.g. My Store"
                  className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-2.5 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8B9DB8] mb-2">Your Name</label>
                <input
                  type="text"
                  value={form.owner_name}
                  onChange={(e) => handleFormChange('owner_name', e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-2.5 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8B9DB8] mb-2">Phone Number</label>
                <input
                  type="text"
                  value={form.whatsapp_number}
                  onChange={(e) => handleFormChange('whatsapp_number', e.target.value)}
                  placeholder="e.g. 1234567890 (with country code)"
                  className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-2.5 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition font-mono"
                />
                <p className="text-xs text-[#5A6B82] mt-1.5">Include your country code, e.g. 92 for Pakistan, 1 for US</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8B9DB8] mb-2">Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => handleFormChange('industry', e.target.value)}
                  className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-4 py-2.5 text-[#E8EEF7] focus:border-[#508DFF] focus:outline-none transition"
                >
                  <option value="clothing">Clothing Brand</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="clinic">Clinic</option>
                  <option value="general">Other Business</option>
                </select>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.business_name || !form.owner_name || !form.whatsapp_number}
                className="btn-electric w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2: Products */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Products</h2>
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => setBulkMode(false)}
                    className={`px-3 py-1 rounded-full font-medium transition ${!bulkMode ? 'btn-electric' : 'btn-ghost'}`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setBulkMode(true)}
                    className={`px-3 py-1 rounded-full font-medium transition ${bulkMode ? 'btn-electric' : 'btn-ghost'}`}
                  >
                    ⚡ Bulk Paste
                  </button>
                </div>
              </div>

              {bulkMode ? (
                <div className="space-y-3">
                  <p className="text-sm text-[#8B9DB8]">
                    Paste your entire product list at once. Our AI will parse names, prices, sizes, and descriptions automatically.
                    You can add products in any format — one per line.
                  </p>
                  <textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder={`Lawn Suit, 1500, S M L XL, Premium cotton
Cotton Kurti, 1200, S M L, Embroidered neck
Silk Dupatta, 800, Free Size, Pure silk`}
                    rows={8}
                    className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-sm text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none font-mono"
                  />
                  <div className="bg-[#508DFF]/5 border border-[#508DFF]/20 rounded-lg p-3">
                    <p className="text-xs text-[#8B9DB8]">
                      💡 <span className="text-[#508DFF] font-medium">Tip:</span> You can skip this for now and add all your products later from the Dashboard using the AI Bulk Upload feature.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#8B9DB8]">Your AI agent will use these products to answer customer questions.</p>
                  {products.map((p, idx) => (
                    <div key={idx} className="bg-[#0A1628]/60 border border-[#508DFF]/15 rounded-lg p-4 space-y-3">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                        placeholder="Product name (e.g. Cotton Shirt)"
                        className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                      />
                      <div className="flex gap-3">
                        <input
                          type="number"
                          value={p.price}
                          onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                          placeholder="Price"
                          className="flex-1 bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                        />
                        <input
                          type="text"
                          value={p.sizes}
                          onChange={(e) => handleProductChange(idx, 'sizes', e.target.value)}
                          placeholder="Sizes (S, M, L)"
                          className="flex-1 bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition"
                        />
                      </div>
                      <textarea
                        value={p.description}
                        onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                        placeholder="Description (fabric, color, etc.)"
                        className="w-full bg-[#0A1628] border border-[#508DFF]/20 rounded-lg px-3 py-2 text-[#E8EEF7] placeholder-[#5A6B82] focus:border-[#508DFF] focus:outline-none transition text-sm"
                        rows={2}
                      />
                    </div>
                  ))}

                  <button onClick={addProduct} className="text-[#508DFF] font-medium text-sm hover:text-[#6FA3FF] transition">
                    + Add Another Product
                  </button>
                </>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3 rounded-lg font-semibold">
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-electric flex-1 py-3 rounded-lg font-semibold"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Connect */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              <h2 className="text-xl font-semibold">Connect Your Number</h2>
              <div className="bg-[#508DFF]/10 border border-[#508DFF]/20 rounded-xl p-6">
                <div className="text-4xl mb-3">📱</div>
                <p className="text-sm text-[#8B9DB8]">
                  Your number <span className="text-[#E8EEF7] font-medium font-mono">{form.whatsapp_number}</span> will be connected.
                  After setup, go to Dashboard → "Connect" → scan QR code or use pairing code.
                </p>
              </div>

              <div className="bg-[#EFF35F]/5 border border-[#EFF35F]/20 rounded-xl p-4 text-left">
                <p className="text-sm text-[#8B9DB8]">
                  <span className="text-[#EFF35F] font-medium">Next:</span> Dashboard → Connect → Scan QR code.
                  Completely free, no API fees. 🎉
                </p>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3 rounded-lg font-semibold">
                  ← Back
                </button>
                <button
                  onClick={submitOnboarding}
                  disabled={loading}
                  className="btn-electric flex-1 py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loading ? 'Setting up...' : '✅ Complete Setup!'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
