/**
 * Neon Postgres — free serverless database
 * Uses postgres.js driver
 * Env var: DATABASE_URL
 */

import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || ''

// Lazy singleton — only create connection when first query runs
let _sql: ReturnType<typeof postgres> | null = null

function getSql(): ReturnType<typeof postgres> {
  if (!_sql) {
    if (!connectionString) {
      throw new Error('DATABASE_URL not configured')
    }
    _sql = postgres(connectionString, {
      ssl: 'require',
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }
  return _sql
}

/**
 * sql tagged template — usage: await sql`SELECT * FROM businesses`
 * Also supports sql.end() to close connection.
 *
 * We export a function that, when called as tagged template, delegates to the real sql instance.
 */
function sql(strings: TemplateStringsArray, ...values: any[]): Promise<any[]> {
  return (getSql() as any)(strings, ...values)
}

// Attach methods that postgres.js exposes (like .end, .unsafe, etc.)
;(sql as any).__proto__ = new Proxy({}, {
  get(_, prop) {
    const real = getSql()
    const val = Reflect.get(real, prop)
    return typeof val === 'function' ? val.bind(real) : val
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
