import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'Blog — SellBot | AI Sales Insights & Case Studies',
  description: 'Tips, case studies, and data-driven insights on how AI sales agents help businesses capture more orders, reduce fake COD, and grow revenue.',
  openGraph: {
    title: 'Blog — SellBot | AI Sales Insights',
    description: 'Tips, case studies, and data-driven insights on AI sales automation.',
  },
}

const posts = [
  {
    slug: 'missed-sales-problem',
    title: 'Why Businesses Lose 40% of Sales Every Day',
    excerpt: 'Millions of businesses rely on messaging apps for sales, but most only reply during business hours. Here\'s what that costs — and how to fix it.',
    date: 'July 6, 2026',
    tag: 'Research',
    readTime: '5 min',
  },
  {
    slug: 'multilingual-ai',
    title: 'Why Your AI Agent Must Speak Your Customer\'s Language',
    excerpt: 'English-first AI tools miss context in mixed-language conversations. A multilingual agent that mirrors your customer\'s tone drives 67% higher conversions.',
    date: 'July 5, 2026',
    tag: 'AI',
    readTime: '4 min',
  },
  {
    slug: 'cod-verification-savings',
    title: 'How COD Verification Saves $200+/Month in Fake Orders',
    excerpt: '30%+ of Cash on Delivery orders are fake or cancelled. AI-powered confirmation eliminates waste and protects your margins.',
    date: 'July 4, 2026',
    tag: 'Tips',
    readTime: '6 min',
  },
  {
    slug: 'clothing-brand-case-study',
    title: 'Clothing Brand Case Study: 67% More Orders with Zero Manual Work',
    excerpt: '200 daily inquiries, 15% conversion rate. After adding an AI agent: 25% conversion, 0 hours of manual replies, 20 extra orders per day.',
    date: 'July 3, 2026',
    tag: 'Case Study',
    readTime: '7 min',
  },
  {
    slug: 'restaurant-automation',
    title: 'Restaurant Case Study: Recovering 15 Lost Orders Per Night',
    excerpt: 'Staff goes home at 10 PM. Customers order at 11 PM. No reply. Here\'s how a 24/7 AI agent recovered every after-hours order.',
    date: 'July 2, 2026',
    tag: 'Case Study',
    readTime: '5 min',
  },
  {
    slug: 'direct-orders-vs-platforms',
    title: 'Direct Orders vs. Delivery Platforms: The Commission Problem',
    excerpt: 'Delivery platforms charge 25-30% commission. Direct orders cost nothing — but require 24/7 availability. Here\'s how AI bridges the gap.',
    date: 'July 1, 2026',
    tag: 'Business',
    readTime: '6 min',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7]">
      <MarketingNav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#508DFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest text-[#508DFF] font-medium mb-4">Blog</div>
          <h1 className="heading-split text-4xl md:text-6xl mb-6">
            Insights for <span className="heading-accent">growing businesses.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            AI sales automation tips, case studies, and data-driven insights — practical strategies you can apply today.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden hover:border-[#508DFF]/40 transition group">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-[#508DFF]/20 to-[#0F2A47] p-12 flex items-center justify-center min-h-[200px]">
                <div className="text-6xl">📊</div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tag-acid px-3 py-1 rounded-full text-xs font-medium">Featured</span>
                  <span className="text-xs text-[#5A6B82]">{posts[0].date} • {posts[0].readTime} read</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-[#508DFF] transition">{posts[0].title}</h2>
                <p className="text-[#8B9DB8] text-sm mb-4">{posts[0].excerpt}</p>
                <Link href={`/blog/${posts[0].slug}`} className="text-[#508DFF] text-sm font-medium hover:text-[#6FA3FF] transition">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(1).map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="glass rounded-2xl p-8 hover:border-[#508DFF]/40 transition group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-[#508DFF] font-medium uppercase tracking-wider">{post.tag}</span>
                  <span className="text-xs text-[#5A6B82]">{post.date} • {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#508DFF] transition">{post.title}</h3>
                <p className="text-[#8B9DB8] text-sm">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-[#0F2A47]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-split text-2xl md:text-3xl mb-4">
            Weekly tips, <span className="heading-accent">delivered to you.</span>
          </h2>
          <p className="text-[#8B9DB8] mb-6">One actionable tip every week — practical AI sales advice for growing businesses.</p>
          <Link href="/onboarding" className="btn-electric px-8 py-3 rounded-lg inline-block">
            Start Free Trial →
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
