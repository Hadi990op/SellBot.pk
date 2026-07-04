import { getBusinessFromCookies } from '@/lib/auth'
import { DashboardHeader, NoAccess } from '../_components'

export const dynamic = 'force-dynamic'

export default async function WhatsappSetupPage() {
  const business = await getBusinessFromCookies()
  if (!business) return <NoAccess />

  const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://learn-easy-essence-august.2n6.me/sellbot'}/api/webhook`

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader business={business} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">📱 WhatsApp Setup Guide</h1>

        {!business.phone_number_id && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="font-medium text-yellow-800 mb-1">⚠️ WhatsApp abhi connect nahi</div>
            <p className="text-sm text-yellow-700">
              Aapka business WhatsApp se connect nahi hai. Neeche steps follow karein.
            </p>
          </div>
        )}

        <div className="space-y-6">
          <Step number="1" title="Meta Developer Account Banayein">
            <p className="text-sm text-gray-600 mb-2">
              <a href="https://developers.facebook.com" target="_blank" rel="noopener" className="text-green-600 font-medium underline">
                developers.facebook.com
              </a> pe jao → "My Apps" → "Create App" → "Business" type.
            </p>
            <p className="text-sm text-gray-600">App naam kuch bhi rakho (e.g. "SellBot"). Business account connect karo.</p>
          </Step>

          <Step number="2" title="WhatsApp Business API Add Karein">
            <p className="text-sm text-gray-600">
              App ke "Add Product" me jao → "WhatsApp" select karo. Free tier me 250 conversations/week milte hain (test number).
            </p>
          </Step>

          <Step number="3" title="Webhook URL Set Karein">
            <p className="text-sm text-gray-600 mb-3">
              WhatsApp → Configuration → Webhook section me:
            </p>
            <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs mb-2 break-all">
              {webhookUrl}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Verify Token:</strong>
            </p>
            <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs mb-3">
              sellbot_verify_2026
            </div>
            <p className="text-sm text-gray-600">
              "Verify and Save" press karo. Phir "messages" field pe Subscribe karo.
            </p>
          </Step>

          <Step number="4" title="Phone Number ID Copy Karein">
            <p className="text-sm text-gray-600 mb-2">
              WhatsApp → API Setup → "Phone Number ID" copy karo aur yahan paste karo:
            </p>
            <form action="/api/business/update-phone" method="POST" className="space-y-2">
              <input
                name="phone_number_id"
                placeholder="123456789012345"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono"
                defaultValue={business.phone_number_id || ''}
              />
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm">
                Save Phone Number ID
              </button>
            </form>
          </Step>

          <Step number="5" title="Test Number Add Karein">
            <p className="text-sm text-gray-600">
              WhatsApp → API Setup → "To" field me apna WhatsApp number add karo (country code ke saath, e.g. 923001234567).
              Meta se ek test message ayega. Phir apne WhatsApp se test number pe message bhejo!
            </p>
          </Step>

          <Step number="6" title="Live Test! 🚀">
            <p className="text-sm text-gray-600">
              Apne WhatsApp se Meta ke test number pe message bhejo: "Bhai price kya hai?"
              SellBot Roman Urdu me reply karega!
            </p>
          </Step>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="font-medium text-green-800 mb-1">💡 Need help?</div>
          <p className="text-sm text-green-700">
            Agar koi masla ho to owner ko message karein. Hum aapko setup karne me madad karenge.
          </p>
        </div>
      </div>
    </main>
  )
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  )
}
