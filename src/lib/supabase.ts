import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Lazy initialization — prevents build-time crash when env vars are missing
let _client: SupabaseClient | null = null
let _admin: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    _client = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder')
  }
  return _client
}

function getAdmin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder')
  }
  return _admin
}

// Use as getter to avoid build-time initialization
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return Reflect.get(getClient(), prop)
  },
})

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return Reflect.get(getAdmin(), prop)
  },
})

export type Business = {
  id: string
  whatsapp_number: string
  business_name: string
  industry: 'clothing' | 'restaurant' | 'clinic' | 'general'
  owner_name: string
  created_at: string
  plan: 'trial' | 'starter' | 'growth' | 'pro'
  phone_number_id?: string
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
  conversation_id: string
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
