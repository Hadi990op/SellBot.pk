import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '../marketing'

export const metadata = {
  title: 'Blog — SellBot.pk',
  description: 'Pakistani WhatsApp businesses ke liye tips, case studies, aur AI sales insights.',
}

const posts = [
  {
    slug: 'whatsapp-sales-pakistan',
    title: 'Pakistan me WhatsApp pe 40% sales kyun miss hoti hain',
    excerpt: '21M WhatsApp Business accounts, lekin sirf 15% businesses 24/7 reply karte hain. Baqi 40% leads waste. Data aur solution.',
    date: 'July 6, 2026',
    tag: 'Research',
    readTime: '5 min',
  },
  {
    slug: 'roman-urdu-ai',
    title: 'Roman Urdu AI kyun zaroori hai Pakistani businesses ke liye',
    excerpt: 'English-first AI tools Pakistani customer ki language nahi samajhte. Roman Urdu = native understanding = better conversions.',
    date: 'July 5, 2026',
    tag: 'AI',
    readTime: '4 min',
  },
  {
    slug: 'cod-verification-savings',
    title: 'COD verification se PKR 15K/month kaise bachayein',
    excerpt: '30%+ fake COD orders Pakistani e-commerce ka sabse bada masla. AI verification se kaise bachat karein — detailed breakdown.',
    date: 'July 4, 2026',
    tag: 'Tips',
    readTime: '6 min',
  },
  {
    slug: 'clothing-brand-case-study',
    title: 'Lahore clothing brand: PKR 40K/day extra kaise kamaye',
    excerpt: '200 daily WhatsApp inquiries, 15% conversion. SellBot se 25% conversion, 0 hours manual, +20 extra orders/day. Full breakdown.',
    date: 'July 3, 2026',
    tag: 'Case Study',
    readTime: '7 min',
  },
  {
    slug: 'restaurant-whatsapp-automation',
    title: 'Karachi restaurant raat ke 15 orders kyun lose karta tha',
    excerpt: 'Staff 10pm pe chala jata hai, customers 11pm pe order karte hain. Koi reply nahi. 24/7 AI se kaise solve kiya.',
    date: 'July 2, 2026',
    tag: 'Case Study',
    readTime: '5 min',
  },
  {
    slug: 'whatsapp-vs-foodpanda',
    title: 'WhatsApp direct orders vs Foodpanda: commission comparison',
    excerpt: 'Foodpanda 25-30% commission. WhatsApp direct = 0%. Lekin manual management mushkil. AI se dono kaam saath kaise.',
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
            Insights for <span className="heading-accent">Pakistani businesses.</span>
          </h1>
          <p className="text-lg text-[#8B9DB8] max-w-2xl mx-auto">
            WhatsApp sales tips, AI automation strategies, case studies, aur data-driven insights — sab Roman Urdu me.
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
            Weekly tips <span className="heading-accent">WhatsApp pe.</span>
          </h2>
          <p className="text-[#8B9DB8] mb-6">Har hafte ek actionable tip — Pakistani business ke liye AI sales advice.</p>
          <Link href="/onboarding" className="btn-electric px-8 py-3 rounded-lg inline-block">
            Free Trial Shuru Karein →
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
