/**
 * AI Agent — Roman-Urdu-native sales agent with provider failover.
 * Primary: Groq Llama 3.3 70B (free, fast, 30 RPM)
 * Fallback: OpenRouter free models (50 RPD)
 *
 * Uses OpenAI SDK with baseURL swap for all providers.
 */

import OpenAI from 'openai'

type Provider = {
  name: string
  baseURL: string
  apiKey: string
  model: string
}

function getProviders(): Provider[] {
  return [
    {
      name: 'Groq',
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY || '',
      model: 'llama-3.3-70b-versatile',
    },
    {
      name: 'OpenRouter',
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY || '',
      model: 'meta-llama/llama-3.3-70b-instruct:free',
    },
  ].filter((p) => p.apiKey)
}

export function buildSystemPrompt(business: {
  business_name: string
  industry: string
  owner_name: string
  products: { name: string; price: number; description: string; sizes?: string[] | null; in_stock: boolean }[]
}): string {
  const industryContext: Record<string, string> = {
    clothing: `Tu ek clothing brand ka sales agent hai. Customer ko size chart bhejo, fabric care info do, COD available batao. Size poochho (S/M/L/XL ya specific measurements). Color options batao. Out-of-stock item pe alternative suggest karo.`,
    restaurant: `Tu ek restaurant ka order-taker hai. Menu bhejo, daily specials batao, table booking karwa sakte ho. Order me item name, quantity, aur delivery/collection confirm karo. Foodpanda ke commission se bachne ke liye direct WhatsApp order encourage karo.`,
    clinic: `Tu ek clinic ka appointment agent hai. Doctor ke available slots batao, appointment book karo, patient ka naam aur phone number poochho. Reminder bhejo ke appointment se 1 din pehle. Emergency pe owner/human ko hand-off karo.`,
    general: `Tu ek business sales agent hai. Customer ki madad karo, products batao, orders le lo, delivery info do.`,
  }

  const productsList = business.products
    .map((p, i) => `${i + 1}. ${p.name} — PKR ${p.price}${p.sizes ? ` (Sizes: ${p.sizes.join('/')})` : ''} — ${p.in_stock ? 'In Stock' : 'Out of Stock'}\n   ${p.description}`)
    .join('\n')

  return `Tu "${business.business_name}" ka sales agent hai. Owner ka naam ${business.owner_name} hai.

${industryContext[business.industry] || industryContext.general}

## Tera Style
- Customer se Roman Urdu, Urdu, ya English me baat karo — jis language me wo likhe, usi me reply karo.
- Pehle friendly greeting karo (e.g. "Assalam o Alaikum! ${business.business_name} me khush aamdeed 🌟").
- Hamesha polite, warm, thoda emoji use kar (✨🌟👍😊), par zyada nahi.
- Short replies do, lamba essay nahi.
- Price negotiate karne ki koshish kar lekin catalog price se neeche mat jaa.

## Products Catalog
${productsList || 'Koi products abhi add nahi hue. Customer ko bolo "abhi catalog update ho raha hai, thodi der me bhej dunga".'}

## Order Flow
1. Customer product poochhe → catalog se info do
2. Size/quantity/color confirm karo
3. Delivery city poochho → charges batao (default PKR 200-300)
4. Payment method: COD available hai. Easypaisa/JazzCash bhi available.
5. COD order pe customer ko confirm karo: "Order confirm karne ke liye 'YES' reply karein. 2 din me reply na aane pe order cancel ho jayega."
6. Order confirm hone pe customer ko order summary bhejo + owner ko notify karo.

## Important Rules
- Agar customer aisi question pooche jo catalog me nahi (e.g. fabric detail, custom order), to bolo: "Yeh detail owner se confirm kar ke bata dunga, ek minute 🙏" — aur human hand-off trigger karo.
- Kabhi bhi galat price mat batao. Catalog se hi quote karo.
- Customer rude ho to calm raho, owner ko inform karo.
- Hamesha end me ek question poochho taake conversation aage barhe.`
}

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export async function generateReply(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string | null> {
  const providers = getProviders()
  if (providers.length === 0) {
    console.error('[AI] No LLM provider configured')
    return null
  }

  const fullMessages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...messages.slice(-10), // keep last 10 messages for context
  ]

  for (const provider of providers) {
    try {
      const client = new OpenAI({
        apiKey: provider.apiKey,
        baseURL: provider.baseURL,
      })

      const res = await client.chat.completions.create({
        model: provider.model,
        messages: fullMessages,
        max_tokens: 300,
        temperature: 0.7,
      })

      const reply = res.choices[0]?.message?.content
      if (reply) {
        console.log(`[AI] Reply via ${provider.name} (${reply.length} chars)`)
        return reply.trim()
      }
    } catch (e: any) {
      console.error(`[AI] ${provider.name} failed:`, e?.message || e)
      continue
    }
  }

  console.error('[AI] All providers failed')
  return null
}

/**
 * Extract order details from conversation using LLM.
 * Returns structured order or null.
 */
export async function extractOrder(
  messages: ChatMessage[],
  products: { id: string; name: string; price: number }[]
): Promise<{ items: { product_id: string; name: string; qty: number; size?: string; price: number }[]; total: number; customer_address?: string } | null> {
  const productNames = products.map((p) => `${p.id}: ${p.name} (PKR ${p.price})`).join('\n')

  const providers = getProviders()
  if (providers.length === 0) return null

  for (const provider of providers) {
    try {
      const client = new OpenAI({ apiKey: provider.apiKey, baseURL: provider.baseURL })
      const res = await client.chat.completions.create({
        model: provider.model,
        messages: [
          {
            role: 'system',
            content: `Tu ek order extraction assistant hai. Conversation se order details extract karo aur JSON me return karo.
Products available:
${productNames}

Agar conversation me clear order hai, to JSON return karo:
{"items":[{"product_id":"...","name":"...","qty":1,"size":"M","price":1000}],"total":1000,"customer_address":"..."}

Agar koi clear order nahi hai, to sirf "null" return karo. Sirf JSON ya null, koi aur text nahi.`,
          },
          ...messages.slice(-10),
        ],
        max_tokens: 200,
        temperature: 0.1,
      })

      const text = res.choices[0]?.message?.content?.trim()
      if (!text || text === 'null') return null
      return JSON.parse(text)
    } catch (e) {
      console.error(`[AI] Order extraction ${provider.name} failed:`, e)
      continue
    }
  }
  return null
}
