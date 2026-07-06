'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader, NoAccess } from '../_components'

export default function ConnectPage() {
  const [tab, setTab] = useState<'qr' | 'code'>('qr')
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [pairingCode, setPairingCode] = useState<string | null>(null)
  const [phoneInput, setPhoneInput] = useState('')
  const [status, setStatus] = useState<string>('Loading...')
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Poll status
  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch('/sellbot/api/baileys/status')
        const data = await res.json()
        setStatus(data.state)
        setConnected(data.state === 'connected')
        if (data.phoneNumber) {
          setStatus(`Connected as ${data.phoneNumber}`)
        }
      } catch (e) {
        setStatus('Service offline')
      }
    }, 3000)
    return () => clearInterval(poll)
  }, [])

  // Fetch QR code when on QR tab
  useEffect(() => {
    if (tab !== 'qr' || connected) return
    let active = true
    
    const fetchQR = async () => {
      try {
        const res = await fetch('/sellbot/api/baileys/qr')
        const data = await res.json()
        if (active && data.qr) {
          setQrImage(data.qr)
        }
      } catch (e) {
        if (active) setError('QR code fetch nahi ho saka')
      }
    }
    
    fetchQR()
    const interval = setInterval(fetchQR, 5000)
    return () => { active = false; clearInterval(interval) }
  }, [tab, connected])

  const requestPairingCode = async () => {
    if (!phoneInput) {
      setError('Phone number daalein')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/sellbot/api/baileys/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneInput.replace(/\D/g, '') }),
      })
      const data = await res.json()
      if (data.code) {
        setPairingCode(data.code)
      } else if (data.message) {
        setError(data.message + ' 3 second baad dobara try karein.')
      } else {
        setError('Pairing code generate nahi hua')
      }
    } catch (e: any) {
      setError(e?.message || 'Error')
    }
    setLoading(false)
  }

  const disconnect = async () => {
    if (!confirm('WhatsApp disconnect karna hai?')) return
    try {
      await fetch('/sellbot/api/baileys/disconnect', { method: 'POST' })
      setConnected(false)
      setPairingCode(null)
      setQrImage(null)
      setStatus('disconnected')
    } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader business={null} />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">📱 WhatsApp Connect</h1>
        <p className="text-sm text-gray-500 mb-6">
          Apna WhatsApp number connect karein — bilkul free, koi Meta API ya payment nahi chahiye.
        </p>

        {/* Status banner */}
        <div className={`rounded-xl p-4 mb-6 ${connected ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
            <div>
              <div className={`font-medium ${connected ? 'text-green-800' : 'text-blue-800'}`}>
                {connected ? '✅ WhatsApp Connected' : '⏳ ' + status}
              </div>
              {!connected && (
                <div className="text-xs text-gray-500 mt-0.5">Neeche QR scan ya pairing code use karein</div>
              )}
            </div>
          </div>
        </div>

        {connected ? (
          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">WhatsApp Connected!</h3>
            <p className="text-sm text-gray-600 mb-4">{status}</p>
            <button
              onClick={disconnect}
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Disconnect karein
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('qr')}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
                  tab === 'qr' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                📷 QR Code
              </button>
              <button
                onClick={() => setTab('code')}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition ${
                  tab === 'code' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                🔢 Pairing Code
              </button>
            </div>

            {/* QR Code tab */}
            {tab === 'qr' && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-3">WhatsApp se QR scan karein</h3>
                <ol className="text-sm text-gray-600 space-y-2 mb-4">
                  <li>1. Apne phone me WhatsApp open karein</li>
                  <li>2. Settings → Linked Devices → Link a Device</li>
                  <li>3. Niche QR code scan karein</li>
                </ol>
                {qrImage ? (
                  <div className="flex justify-center">
                    <img src={qrImage} alt="WhatsApp QR Code" className="w-64 h-64 rounded-lg border border-gray-100" />
                  </div>
                ) : (
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    QR code generate ho raha hai...
                  </div>
                )}
              </div>
            )}

            {/* Pairing Code tab */}
            {tab === 'code' && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-3">Phone number se connect karein</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Apna WhatsApp number daalein (country code ke saath, e.g. 923001234567).
                  Ek 6-digit code aayega jo WhatsApp me enter karna hai.
                </p>
                <div className="flex gap-2 mb-4">
                  <input
                    type="tel"
                    placeholder="923001234567"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
                  />
                  <button
                    onClick={requestPairingCode}
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? '...' : 'Code Le'}
                  </button>
                </div>

                {pairingCode && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-xs text-green-700 mb-2">Aapka pairing code:</div>
                    <div className="text-4xl font-bold tracking-widest text-green-800 mb-3 font-mono">
                      {pairingCode}
                    </div>
                    <p className="text-sm text-green-700">
                      WhatsApp → Settings → Linked Devices → Link with Phone Number → ye code enter karein
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="font-medium text-blue-800 mb-1">💡 Ye kaise kaam karta hai?</div>
          <p className="text-sm text-blue-700">
            SellBot aapke WhatsApp ko ek "Linked Device" ki tarah connect karta hai (jaise WhatsApp Web).
            Bilkul free — koi Meta Business API, koi payment, koi limit nahi.
            Customer messages directly aapke WhatsApp pe aate hain, aur AI automatically reply karta hai.
          </p>
        </div>
      </div>
    </main>
  )
}
