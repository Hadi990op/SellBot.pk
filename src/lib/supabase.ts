/**
 * Neon Postgres — free serverless database
 * Uses postgres.js driver
 * Env var: DATABASE_URL
 *
 * Neon free tier auto-suspends idle connections after ~5 min. To survive this:
 * - We create a fresh connection per query (no long-lived singleton that goes stale)
 * - We retry once on connection errors (Neon cold-start can time out the first attempt)
 * - connect_timeout is generous (30s) to allow Neon cold-start
 */

import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || ''

function createSql(): ReturnType<typeof postgres> {
  if (!connectionString) {
    throw new Error('DATABASE_URL not configured')
  }
  return postgres(connectionString, {
    ssl: 'require',
    max: 3,
    idle_timeout: 10,
    connect_timeout: 30,
    max_lifetime: 60 * 10, // recreate connections every 10 min to avoid stale sockets
    prepare: false, // disable prepared statements — safer with Neon's connection pooling
  })
}

const CONNECTION_ERROR_RE = /CONNECT_TIMEOUT|ECONNRESET|ECONNREFUSED|read ETIMEDOUT|connection.*terminated|write CONNECT/i

/**
 * sql tagged template — usage: await sql`SELECT * FROM businesses`
 * Retries once on connection errors (Neon cold-start), then end()s the client to
 * release sockets immediately (we don't keep connections alive between cron runs).
 */
async function sql(strings: TemplateStringsArray, ...values: any[]): Promise<any[]> {
  let client = createSql()
  let result: any[]
  try {
    result = await (client as any)(strings, ...values)
  } catch (err: any) {
    // If it's a connection-level error, retry once with a fresh client
    if (CONNECTION_ERROR_RE.test(err?.message || '')) {
      try { await client.end() } catch {}
      client = createSql()
      result = await (client as any)(strings, ...values)
    } else {
      try { await client.end() } catch {}
      throw err
    }
  }
  try { await client.end() } catch {}
  return result
}

// Attach methods that postgres.js exposes (like .end, .unsafe, etc.)
;(sql as any).__proto__ = new Proxy({}, {
  get(_, prop) {
    const client = createSql()
    const val = Reflect.get(client, prop)
    return typeof val === 'function' ? val.bind(client) : val
  },
})

export { sql }

// Types
export type Business = {
  id: string
  whatsapp_number: string
  business_name: string
  industry: 'clothing' | 'restaurant' | 'clinic' | 'general'
  owner_name: string
  created_at: string
  plan: 'trial' | 'starter' | 'growth' | 'pro'
  phone_number_id?: string | null
}

export type Product = {
  id: string
  business_id: string
  name: string
  price: number
  description: string
  image_url: string | null
  sizes: string[] | null
  in_stock: boolean
}

export type Conversation = {
  id: string
  business_id: string
  customer_phone: string
  customer_name: string | null
  status: 'active' | 'order_placed' | 'abandoned' | 'handed_off'
  created_at: string
}

export type Message = {
  id: string
  conversation_id: string
  role: 'customer' | 'agent' | 'owner'
  content: string
  created_at: string
}

export type Order = {
  id: string
  conversation_id: string | null
  business_id: string
  items: { product_id: string; name: string; qty: number; size?: string; price: number }[]
  total: number
  customer_phone: string
  customer_address: string | null
  payment_method: 'cod' | 'easypaisa' | 'jazzcash'
  cod_verified: boolean
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled'
  created_at: string
}
