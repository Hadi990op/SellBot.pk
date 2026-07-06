import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarketingNav, MarketingFooter } from '../../marketing'

const posts: Record<string, { title: string; date: string; tag: string; readTime: string; content: string[] }> = {
  'missed-sales-problem': {
    title: 'Why Businesses Lose 40% of Sales Every Day',
    date: 'July 6, 2026',
    tag: 'Research',
    readTime: '5 min',
    content: [
      'Millions of small businesses around the world rely on messaging apps to communicate with customers. But the vast majority only reply during business hours. The result? A significant portion of potential sales simply disappears.',
      'Research shows that businesses can lose up to 40% of inbound leads simply because no one responds quickly enough. A customer who messages at 11 PM and gets no reply by morning will almost certainly buy from a competitor who answered.',
      'When staff goes home at 10 PM, customers keep messaging. "Is this available in size M?" No reply. By the time the owner checks in the morning, the customer has already purchased elsewhere.',
      'The solution is simple: a 24/7 AI agent that replies instantly. It checks your product catalog for prices and availability. It confirms orders. It sends you a morning report.',
      'SellBot does exactly this. A 14-day free trial — no credit card required. Setup in 5 minutes. Connect your number with a QR code or pairing code, and your AI sales agent goes live.',
    ],
  },
  'multilingual-ai': {
    title: 'Why Your AI Agent Must Speak Your Customer\'s Language',
    date: 'July 5, 2026',
    tag: 'AI',
    readTime: '4 min',
    content: [
      'Customers don\'t always speak perfect English. They write in their native language — sometimes mixed with English, sometimes in local script, sometimes in romanized form. An AI that only understands English misses context, tone, and intent.',
      'English-first AI tools translate literally, miss cultural context, and produce robotic replies that feel impersonal. Customers can tell — and they disengage.',
      'SellBot is designed to mirror your customer\'s language. If they write in their local language, the agent replies in the same way. If they mix English and local language, the agent adapts. It greets naturally, uses appropriate emojis, and confirms COD availability.',
      'The result: customers feel like they\'re talking to a real person — not a bot. Conversion rates jump from 15% to 25% on average.',
    ],
  },
  'cod-verification-savings': {
    title: 'How COD Verification Saves $200+/Month in Fake Orders',
    date: 'July 4, 2026',
    tag: 'Tips',
    readTime: '6 min',
    content: [
      'Cash on Delivery (COD) is the most popular payment method in many emerging markets. But there\'s a major problem: 30%+ of COD orders are fake or get cancelled.',
      'A customer places an order. A courier is dispatched. The customer isn\'t home, or they changed their mind. The courier returns. The business eats the courier cost — typically $1-3 per order.',
      'If you get 50 orders a day and 30% are fake (15 orders), your monthly waste is significant: 15 × $2 × 30 days = $900 per month. That\'s real money lost.',
      'SellBot asks every customer to confirm with "YES" before processing their order. If no reply comes within 24 hours, the order is automatically cancelled. Only serious customers\' orders get processed.',
      'On average, businesses eliminate 30% of fake orders — saving $200-600+ per month. That\'s more than the cost of SellBot itself.',
    ],
  },
  'clothing-brand-case-study': {
    title: 'Clothing Brand Case Study: 67% More Orders with Zero Manual Work',
    date: 'July 3, 2026',
    tag: 'Case Study',
    readTime: '7 min',
    content: [
      'A mid-size clothing brand was receiving 200 daily inquiries on their messaging app — questions about sizes, prices, colors, and availability.',
      'Before SellBot: 3-4 hours of daily manual replies. 15% conversion rate (30 orders/day). The owner had hired a full-time staff member just to handle messages — at a significant monthly salary.',
      'After SellBot: 0 hours of manual work. The AI replies 24/7. Conversion rate jumped to 25% (50 orders/day). That\'s 20 extra orders per day at an average order value of $7 — $140/day in additional revenue.',
      'Monthly impact: +$4,200 in revenue. SellBot cost: ~$50/month. ROI: 84x.',
      'The owner has now reassigned their staff member to sales and marketing — not message-replying. SellBot handles the conversations.',
    ],
  },
  'restaurant-automation': {
    title: 'Restaurant Case Study: Recovering 15 Lost Orders Per Night',
    date: 'July 2, 2026',
    tag: 'Case Study',
    readTime: '5 min',
    content: [
      'A popular restaurant was receiving delivery orders via their messaging app — better than third-party platforms because there\'s no 25% commission.',
      'The problem: staff goes home at 10 PM. From 10 PM to 2 AM, customers message orders — but no one replies. 15-20 orders per night were lost.',
      'After connecting SellBot, the restaurant now takes orders 24/7. The AI sends the menu, confirms orders, collects delivery addresses, and sends the owner a morning report.',
      'Result: 0 lost orders. 15-20 extra orders per night at an average of $3 = $45-60/night in additional revenue. Monthly: $1,350-1,800.',
      'Plus, they save the 25% commission they would have paid to third-party delivery platforms — another $50+/day.',
    ],
  },
  'direct-orders-vs-platforms': {
    title: 'Direct Orders vs. Delivery Platforms: The Commission Problem',
    date: 'July 1, 2026',
    tag: 'Business',
    readTime: '6 min',
    content: [
      'Third-party delivery platforms charge 25-30% commission. On a $10 order, the restaurant gets $7-7.50. That\'s a significant margin cut on every single order.',
      'Direct orders via your messaging app: 0% commission. $10 order = $10 for you. That\'s $2.50-3 saved per order.',
      'But managing direct orders manually is hard — no one replies 24/7, orders don\'t get tracked, and menus need to be sent repeatedly.',
      'SellBot solves this. The AI replies 24/7, stores orders in a database, verifies COD, and sends daily reports. All automated.',
      'Net result: 25-30% more profit per order + 24/7 availability + zero manual work. Direct ordering finally becomes scalable.',
    ],
  },
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: 'Not Found — SellBot' }
  return {
    title: `${post.title} — SellBot Blog`,
    description: post.content[0]?.slice(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-[#508DFF] hover:text-[#6FA3FF] transition mb-6 inline-block">
            ← Back to blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-[#508DFF] font-medium uppercase tracking-wider">{post.tag}</span>
            <span className="text-xs text-[#5A6B82]">{post.date} • {post.readTime} read</span>
          </div>
          <h1 className="heading-split text-3xl md:text-5xl mb-6">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-lg text-[#8B9DB8] leading-relaxed">{para}</p>
          ))}

          {/* CTA */}
          <div className="glass rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-xl font-bold mb-3">Try it yourself</h3>
            <p className="text-sm text-[#8B9DB8] mb-6">14-day free trial. No credit card required. Setup in 5 minutes.</p>
            <Link href="/onboarding" className="btn-electric px-8 py-3 rounded-lg inline-block">
              Start Free Trial →
            </Link>
          </div>
        </div>
      </section>

      <div className="py-16" />
      <MarketingFooter />
    </main>
  )
}
