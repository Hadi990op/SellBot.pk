/**
 * WhatsApp Business Cloud API client
 * Docs: https://developers.facebook.com/docs/whatsapp
 * Service conversations (customer-initiated) are FREE since Nov 2024.
 */

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || ''
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || ''
const WHATSAPP_API_VERSION = 'v21.0'

export async function sendTextMessage(to: string, body: string, businessPhoneId?: string) {
  const phoneId = businessPhoneId || PHONE_NUMBER_ID
  if (!phoneId || !WHATSAPP_TOKEN) {
    console.error('[WhatsApp] Missing token or phone_number_id')
    return null
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneId}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('[WhatsApp] Send failed:', res.status, err)
    return null
  }

  return res.json()
}

export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  appSecret: string
): boolean {
  const crypto = require('crypto')
  const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  // Safe comparison
  if (expected.length !== signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}
