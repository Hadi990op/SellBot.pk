/**
 * Neon Postgres — free serverless database
 * Uses postgres.js driver (lightweight, no Supabase dependency)
 *
 * Connection: postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
 * Env var: DATABASE_URL
 */

import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || ''
const isConfigured = connectionString.length > 0

// Lazy singleton — prevents build-time crash when DATABASE_URL is missing
let _sql: ReturnType<typeof postgres> | null = null

function getSql(): ReturnType<typeof postgres> {
  if (!_sql) {
    _sql = postgres(connectionString || 'postgresql://placeholder:placeholder@localhost:5432/placeholder', {
      ssl: 'require',
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }
  return _sql
}

// Proxy so we can do: sql`SELECT ...` or sql.query(...)
// Falls back gracefully when DB not configured
export const sql = new Proxy({} as ReturnType<typeof postgres>, {
  get(_, prop) {
    return Reflect.get(getSql(), prop)
  },
  apply(_target, _thisArg, args) {
    return Reflect.apply(getSql() as any, undefined, args as any)
  },
})

// Types (same as before)
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
