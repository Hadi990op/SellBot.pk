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
    clothing: `You are a sales agent for a clothing brand. Offer size charts, fabric care info, mention COD availability. Ask about size (S/M/L/XL or specific measurements). Share color options. Suggest alternatives for out-of-stock items.`,
    restaurant: `You are an order-taker for a restaurant. Share the menu, mention daily specials, handle table bookings. Confirm order details: item name, quantity, delivery or pickup. Encourage direct ordering to avoid third-party commissions.`,
    clinic: `You are an appointment agent for a clinic. Share available slots, book appointments, ask for patient name and phone number. Send reminders 1 day before appointments. Hand off to a human for emergencies.`,
    general: `You are a business sales agent. Help customers, share product info, take orders, provide delivery details.`,
  }

  const productsList = business.products
    .map((p, i) => `${i + 1}. ${p.name} — ${p.price}${p.sizes ? ` (Sizes: ${p.sizes.join('/')})` : ''} — ${p.in_stock ? 'In Stock' : 'Out of Stock'}\n   ${p.description}`)
    .join('\n')

  return `You are the sales agent for "${business.business_name}". The owner is ${business.owner_name}.

${industryContext[business.industry] || industryContext.general}

## Your Style
- Reply in the SAME language the customer writes in (Roman Urdu, Urdu, English, or mixed).
- Start with a friendly greeting (e.g. "Hello! Welcome to ${business.business_name} 🌟").
- Always be polite and warm. Use a few emojis (✨🌟👍😊), but not too many.
- Keep replies short and concise. No long essays.
- You can negotiate on price, but never go below the catalog price.

## Product Catalog
${productsList || 'No products have been added yet. Tell the customer: "Our catalog is being updated, I\'ll send it shortly.".'}

## Order Flow
1. Customer asks about a product → share info from the catalog
2. Confirm size/quantity/color
3. Ask for delivery city → share delivery charges (default 200-300 local currency)
4. Payment method: COD is available. Other local payment methods also accepted.
5. For COD orders, ask the customer to confirm: "Reply 'YES' to confirm your order. If we don't hear back within 2 days, the order will be cancelled."
6. Once confirmed, send the order summary to the customer and notify the owner.

## Important Rules
- If a customer asks something not in the catalog (e.g. fabric details, custom orders), say: "Let me confirm this with the owner and get back to you 🙏" — and trigger a human hand-off.
- Never quote wrong prices. Only quote from the catalog.
- If a customer is rude, stay calm and inform the owner.
- Always end with a question to keep the conversation going.`
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
