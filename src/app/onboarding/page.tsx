'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          whatsapp_number: form.whatsapp_number.replace(/\D/g, ''),
          products: products
            .filter((p) => p.name && p.price)
            .map((p) => ({
              name: p.name,
              price: Number(p.price),
              description: p.description,
              sizes: p.sizes ? p.sizes.split(',').map((s) => s.trim()) : null,
              in_stock: p.in_stock,
            })),
        }),
      })

      if (!res.ok) throw new Error('Onboarding failed')
      const data = await res.json()

      // Redirect to dashboard (cookie is set automatically by API)
      router.push(`/dashboard`)
    } catch (e: any) {
      setError(e?.message || 'Kuch galat ho gaya')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SellBot Setup 🚀</h1>
          <p className="text-gray-500 mt-2">5 minute me ho jayega</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Business Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={form.business_name}
                  onChange={(e) => handleFormChange('business_name', e.target.value)}
                  placeholder="e.g. Gulzar Fabrics"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aapka Naam</label>
                <input
                  type="text"
                  value={form.owner_name}
                  onChange={(e) => handleFormChange('owner_name', e.target.value)}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={form.whatsapp_number}
                  onChange={(e) => handleFormChange('whatsapp_number', e.target.value)}
                  placeholder="e.g. 923001234567"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">Country code ke saath, e.g. 92 (Pakistan)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => handleFormChange('industry', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
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
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aage Badhein →
              </button>
            </div>
          )}

          {/* Step 2: Products */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Products Add Karein</h2>
              <p className="text-sm text-gray-500">SellBot in products ke baare me customers ko batayega.</p>

              {products.map((p, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-4 space-y-3">
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                    placeholder="Product naam (e.g. Lawn Suit)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                      placeholder="Price (PKR)"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      value={p.sizes}
                      onChange={(e) => handleProductChange(idx, 'sizes', e.target.value)}
                      placeholder="Sizes (S, M, L)"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <textarea
                    value={p.description}
                    onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                    placeholder="Description (fabric, color, etc.)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    rows={2}
                  />
                </div>
              ))}

              <button onClick={addProduct} className="text-green-600 font-medium text-sm hover:text-green-700">
                + Aur Product Add Karein
              </button>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50">
                  ← Wapas
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Aage Badhein →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Connect WhatsApp */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              <h2 className="text-xl font-semibold">WhatsApp Connect Karein</h2>
              <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="text-4xl mb-3">📱</div>
                <p className="text-sm text-gray-600">
                  Aapka WhatsApp Business number <strong>{form.whatsapp_number}</strong> connect hoga.
                  Setup complete hone ke baad, customers ka message aaye to SellBot automatically reply karega.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-left">
                <p className="text-sm text-gray-600">
                  <strong>Setup Steps:</strong> Dashboard me jao → "WhatsApp Setup" tab → step-by-step guide. 📱
                </p>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50">
                  ← Wapas
                </button>
                <button
                  onClick={submitOnboarding}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? 'Setup ho raha hai...' : '✅ Setup Complete!'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
