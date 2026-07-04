/**
 * Dashboard auth — cookie-based business access token.
 * On onboarding, a random access_token is generated and set as a cookie.
 * Dashboard pages read the cookie to identify the business.
 */

import { sql } from './supabase'
import { cookies } from 'next/headers'

export type AuthBusiness = {
  id: string
  business_name: string
  owner_name: string
  whatsapp_number: string
  industry: string
  plan: string
  trial_ends_at: string | null
  phone_number_id: string | null
}

/**
 * Get business from request cookies (for server components via next/headers).
 */
export async function getBusinessFromCookies(): Promise<AuthBusiness | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb_token')?.value

  if (!token) return null

  try {
    const rows = await sql`
      SELECT id, business_name, owner_name, whatsapp_number, industry, plan, trial_ends_at, phone_number_id
      FROM businesses WHERE access_token = ${token} LIMIT 1
    `
    return (rows as any[])[0] || null
  } catch {
    return null
  }
}

/**
 * Get business from request cookies or query param (for API routes via Request object).
 */
export async function getBusinessFromRequest(req: Request): Promise<AuthBusiness | null> {
  const cookieHeader = req.headers.get('cookie') || ''
  let token: string | null = null

  const cookieParts = cookieHeader.split(';').map((c) => c.trim())
  for (const c of cookieParts) {
    const [k, v] = c.split('=')
    if (k === 'sb_token' && v) {
      token = v
      break
    }
  }

  if (!token) {
    const url = new URL(req.url)
    token = url.searchParams.get('token')
  }

  if (!token) return null

  try {
    const rows = await sql`
      SELECT id, business_name, owner_name, whatsapp_number, industry, plan, trial_ends_at, phone_number_id
      FROM businesses WHERE access_token = ${token} LIMIT 1
    `
    return (rows as any[])[0] || null
  } catch {
    return null
  }
}

/**
 * Set auth cookie header value for API response.
 */
export function authCookieHeader(token: string): string {
  const isProd = process.env.NODE_ENV === 'production'
  return `sb_token=${token}; Path=/sellbot; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 365}${isProd ? '; Secure' : ''}`
}

/**
 * Generate a random access token.
 */
export function generateAccessToken(): string {
  return crypto.randomUUID()
}
