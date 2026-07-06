/**
 * AI Text Parser — parses raw product text/CSV into structured products.
 * Uses free-tier AI models (Groq Llama 3.3 70B free, OpenRouter free models).
 * NO API COST — all providers used are on free tiers.
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

export type ParsedProduct = {
  name: string
  price: number
  description: string
  sizes: string[] | null
  in_stock: boolean
}

/**
 * Parse raw text into structured products using AI.
 * Accepts: CSV, copy-pasted catalog, free-form text, photo OCR output.
 * Returns array of parsed products.
 */
export async function parseProductText(rawText: string): Promise<ParsedProduct[]> {
  const providers = getProviders()

  if (providers.length === 0) {
    // Fallback: simple regex parsing without AI
    return simpleParse(rawText)
  }

  const systemPrompt = `You are a product catalog parser. You receive raw text containing product information (could be CSV, copy-pasted from a phone, or free-form text). Extract all products into structured JSON.

Return ONLY a JSON array. Each product object must have:
- name: string (product name, required)
- price: number (price as a plain number, no currency symbols)
- description: string (brief description if available, empty string if not)
- sizes: array of strings or null (sizes like ["S","M","L"] if mentioned, null if not)
- in_stock: boolean (true by default, false if explicitly marked out of stock)

Rules:
- Extract ALL products found in the text
- Remove currency symbols, commas from prices (PKR 1,500 → 1500)
- If a line has no price, try to find it on the next line
- Return ONLY the JSON array, no explanation, no markdown`


  for (const provider of providers) {
    try {
      const client = new OpenAI({ baseURL: provider.baseURL, apiKey: provider.apiKey })
      const completion = await client.chat.completions.create({
        model: provider.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Parse these products:\n\n${rawText}` },
        ],
        temperature: 0,
        max_tokens: 2000,
      })

      const content = completion.choices[0]?.message?.content?.trim() || ''

      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const products = JSON.parse(jsonMatch[0])
        if (Array.isArray(products) && products.length > 0) {
          // Validate and clean
          return products
            .filter((p: any) => p.name && p.price)
            .map((p: any) => ({
              name: String(p.name).trim(),
              price: Number(p.price) || 0,
              description: String(p.description || '').trim(),
              sizes: Array.isArray(p.sizes) ? p.sizes : null,
              in_stock: p.in_stock !== false,
            }))
        }
      }
    } catch (e: any) {
      console.error(`[ParseProducts] ${provider.name} failed:`, e?.message || e)
      // Try next provider
    }
  }

  // Final fallback: simple regex parsing
  return simpleParse(rawText)
}

/**
 * Simple regex-based parsing fallback (no AI needed).
 * Handles common formats:
 * - "Product Name | Price" per line
 * - "Product Name, Price, Sizes" CSV
 * - "Product Name - PKR 1500"
 */
function simpleParse(text: string): ParsedProduct[] {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l)
  const products: ParsedProduct[] = []

  // Skip header lines like "name,price,sizes"
  const dataLines = lines.filter((l) => !/^(name|product|item)/i.test(l) || /\d/.test(l))

  for (const line of dataLines) {
    // Try comma-separated
    const parts = line.split(/[,|]\s*/)

    if (parts.length >= 2) {
      const name = parts[0]?.trim()
      const priceStr = parts[1]?.replace(/[^\d.]/g, '')
      const price = Number(priceStr)

      if (name && price > 0) {
        const sizes = parts[2] ? parts[2].split(/[\/,]\s*/).map((s) => s.trim()).filter(Boolean) : null
        const desc = parts[3]?.trim() || ''

        products.push({
          name,
          price,
          description: desc,
          sizes: sizes && sizes.length > 0 ? sizes : null,
          in_stock: true,
        })
      }
    } else {
      // Try "Name - PKR 1500" or "Name PKR 1500"
      const match = line.match(/^(.+?)\s*[-–]\s*(?:PKR|Rs\.?|Rs|₨)?\s*([\d,]+(?:\.\d+)?)\s*$/i)
      if (match) {
        const name = match[1].trim()
        const price = Number(match[2].replace(/,/g, ''))
        if (name && price > 0) {
          products.push({ name, price, description: '', sizes: null, in_stock: true })
        }
      }
    }
  }

  return products
}
