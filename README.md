# 🤖 SellBot.pk

**WhatsApp AI Sales Agent for Pakistani SMBs** — Roman-Urdu-native AI that sits inside a business's WhatsApp, closes sales 24/7, verifies COD orders, and sends daily revenue reports.

Built 100% on free tiers. **Zero cost to run for first 50 users.**

---

## 🚀 Quick Setup (30 minutes)

### Step 1: Supabase (Database) — FREE
1. Go to [supabase.com](https://supabase.com) → create free account
2. Create new project (free tier: 500MB DB)
3. Go to SQL Editor → paste contents of `supabase-schema.sql` → Run
4. Go to Settings → API → copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Meta WhatsApp Business API — FREE
1. Go to [developers.facebook.com](https://developers.facebook.com) → create app
2. Add product: WhatsApp Business
3. Get your:
   - Access token → `WHATSAPP_TOKEN`
   - Phone number ID → `WHATSAPP_PHONE_NUMBER_ID`
   - App secret → `WHATSAPP_APP_SECRET`
4. Set webhook URL: `https://your-domain.vercel.app/api/webhook`
5. Set verify token: `sellbot_verify_2026`
6. Subscribe to `messages` event

### Step 3: AI Providers — ALL FREE
1. **Google Gemini** (primary): [aistudio.google.com](https://aistudio.google.com) → Get API key → `GEMINI_API_KEY`
2. **Groq** (fallback): [console.groq.com](https://console.groq.com) → Get API key → `GROQ_API_KEY`
3. **OpenRouter** (fallback): [openrouter.ai](https://openrouter.ai) → Get API key → `OPENROUTER_API_KEY`

### Step 4: Deploy to Vercel — FREE
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add all environment variables (from `.env.example`)
4. Deploy → get URL like `sellbot-pk.vercel.app`
5. Go back to Meta webhook settings → update URL to your Vercel URL

### Step 5: Test
1. Open your landing page
2. Click "14 Din Free Trial" → complete onboarding
3. Send a WhatsApp message to your business number
4. SellBot should reply in Roman Urdu!

---

## 🏗️ Architecture

```
Customer → WhatsApp → Meta Cloud API → Webhook (/api/webhook)
  → Supabase (store message + conversation)
  → AI Agent (Gemini → Groq → OpenRouter failover)
  → Reply via WhatsApp API
  → Order extraction (LLM)
  → Store order in Supabase

Owner → Dashboard (/dashboard) → Supabase → View orders, revenue, conversations

Cron (9 AM PKT) → Daily report → WhatsApp → Owner
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── onboarding/page.tsx   # 3-step setup wizard
│   ├── dashboard/
│   │   ├── page.tsx          # Owner dashboard (revenue, stats)
│   │   ├── orders/           # Order management
│   │   ├── conversations/    # Live chat view
│   │   └── products/         # Catalog management
│   └── api/
│       ├── webhook/         # WhatsApp incoming messages
│       ├── onboarding/      # Business + product creation
│       └── cron/daily-report/ # 9 AM revenue report
├── lib/
│   ├── supabase.ts          # DB client (lazy init)
│   ├── ai-agent.ts          # LLM with 3-provider failover
│   └── whatsapp.ts         # Cloud API client
supabase-schema.sql           # Run this in Supabase
vercel.json                   # Cron config
.env.example                  # All env vars needed
```

## 💰 Cost Structure

| Users | Monthly Cost | Revenue (@15K/user) | Profit |
|-------|-------------|-------------------|--------|
| 50    | Rs. 0       | Rs. 0 (trial)      | — |
| 100   | ~Rs. 8,000  | Rs. 900K           | Rs. 892K |
| 500   | ~Rs. 100K   | Rs. 4.5M           | Rs. 4.4M |
| 1000  | ~Rs. 250K   | Rs. 15M            | Rs. 14.75M |

## 🔐 Why WhatsApp is Free

Per Meta's 2026 pricing: **service conversations (customer-initiated) are FREE and unlimited** since November 2024. Our MVP is reply-only (customer messages first, we respond) = $0 Meta fees.

## 🇵🇰 Differentiators

1. **Roman Urdu first** — "bhai price kya hai" understood natively
2. **COD verification** — kills 30%+ fake orders
3. **Daily revenue report** — "Kal 12 order, PKR 47K — aap so rahe the"
4. **Abandoned recovery** — auto follow-up on "sochta hu"
5. **Vertical templates** — clothing, restaurant, clinic specific flows
6. **Self-learning** — learns from owner's past chat style
7. **Multi-agent inbox** — scales from 1 to 5 staff

## 📝 License

MIT — build freely, sell freely.
