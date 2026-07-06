import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarketingNav, MarketingFooter } from '../../marketing'

const posts: Record<string, { title: string; date: string; tag: string; readTime: string; content: string[] }> = {
  'whatsapp-sales-pakistan': {
    title: 'Pakistan me WhatsApp pe 40% sales kyun miss hoti hain',
    date: 'July 6, 2026',
    tag: 'Research',
    readTime: '5 min',
    content: [
      'Pakistan me 21 million se zyada WhatsApp Business accounts hain — world me sabse high ratio. Har business, chhota ya bada, WhatsApp pe customers se baat karta hai. Lekin ek masla hai: zyada tar businesses 24/7 reply nahi karte.',
      'LinkedIn research ke according, Pakistani businesses 40% tak WhatsApp leads lose karte hain sirf isliye ke koi time pe reply nahi karta. Customer 5 minute me doosri shop pe message karta hai. Aapka lead gaya.',
      'Raat ke 10 baje staff chala jata hai. Customer 11 baje message karta hai — "Black shirt M size available hai?" Koi reply nahi. Subah 9 baje owner dekhta hai — customer ne doosri shop se khareed liya.',
      'Iska solution simple hai: 24/7 AI agent jo instant reply kare. Roman Urdu me. Product catalog se price bata de. Order confirm kare. Subah owner ko report bhej de.',
      'SellBot.pk exactly yahi karta hai. 14 din free trial — koi credit card nahi. 5 minute me setup. QR code scan ya 6-digit pairing code se WhatsApp connect karein aur AI sales agent live.',
    ],
  },
  'roman-urdu-ai': {
    title: 'Roman Urdu AI kyun zaroori hai Pakistani businesses ke liye',
    date: 'July 5, 2026',
    tag: 'AI',
    readTime: '4 min',
    content: [
      'Pakistani customer English me nahi baat karta. Wo likhta hai: "Bhai price kya hai?" ya "Ye available hai kya?" ya "COD ho ga?" Roman Urdu, Urdu script, English mix — sab.',
      'English-first AI tools (ChatGPT, Meta AI, Google Gemini) Pakistani customer ki language properly nahi samajhte. Wo literal translate karte hain, context miss karte hain, aur robotic reply karte hain.',
      'SellBot.pk Roman Urdu native hai. System prompt specifically Pakistani customer interactions ke liye design kiya gaya hai. "Assalam o Alaikum" se start karta hai. Emojis use karta hai. COD available bata deta hai. Size chart de deta hai.',
      'Result: customer ko lagta hai ke real insaan reply kar raha hai — AI nahi. Conversion rates 15% se 25% tak jump kar jate hain.',
    ],
  },
  'cod-verification-savings': {
    title: 'COD verification se PKR 15K/month kaise bachayein',
    date: 'July 4, 2026',
    tag: 'Tips',
    readTime: '6 min',
    content: [
      'Cash on Delivery (COD) Pakistan ka sabse popular payment method hai. Lekin ek masla hai: 30%+ COD orders fake ya cancelled hote hain.',
      'Customer order deta hai. Courier bheja jata hai. Customer ghar pe nahi hota ya change of mind hota hai. Courier return aata hai. Business courier charges bear karta hai — PKR 200-300 per order.',
      'Agar din me 50 orders hain aur 30% fake (15 orders), to monthly waste = 15 × 300 × 30 = PKR 135,000. Yeh bahut zyada hai.',
      'SellBot.pk har order pe customer se "YES" confirm mangta hai. 24 ghante me reply na aane pe order cancel. Is se sirf serious customers ke orders process hote hain.',
      'Average business 30% fake orders eliminate karta hai — monthly PKR 5,000 se 15,000 tak bachat. SellBot ki fees se zyada.',
    ],
  },
  'clothing-brand-case-study': {
    title: 'Lahore clothing brand: PKR 40K/day extra kaise kamaye',
    date: 'July 3, 2026',
    tag: 'Case Study',
    readTime: '7 min',
    content: [
      'Gulzar Fabrics, Lahore me ek mid-size clothing brand hai. WhatsApp pe daily 200 inquiries aati hain — size, price, color, availability.',
      'Before SellBot: 3-4 ghante daily manual replies. 15% conversion (30 orders/day). Owner ne ek staff member full-time WhatsApp pe rakha tha — PKR 25,000/month salary.',
      'After SellBot: 0 hours manual. AI 24/7 replies. 25% conversion (50 orders/day). +20 extra orders × average PKR 2,000 = PKR 40,000/day extra revenue.',
      'Monthly impact: +PKR 1.2M revenue. SellBot cost: PKR 15,000/month. ROI: 80x.',
      'Owner ab staff member ko sales aur marketing pe laga raha hai — WhatsApp pe nahi. SellBot handle karta hai.',
    ],
  },
  'restaurant-whatsapp-automation': {
    title: 'Karachi restaurant raat ke 15 orders kyun lose karta tha',
    date: 'July 2, 2026',
    tag: 'Case Study',
    readTime: '5 min',
    content: [
      'Lahore Eats, Karachi me ek popular restaurant hai. Delivery orders WhatsApp pe aate hain — Foodpanda se behtar kyunki 25% commission nahi dena.',
      'Masla: staff 10pm pe band ho jata hai. 10pm se 2am tak customers WhatsApp pe order karte hain — koi reply nahi. 15-20 orders/night lose.',
      'SellBot connect kiya. Ab 24/7 order-taking. AI menu bhejta hai, order confirm karta hai, delivery address leta hai, aur owner ko subah report.',
      'Result: 0 lost orders. 15-20 extra orders/night × PKR 500 average = PKR 7,500-10,000/night extra. Monthly: PKR 225,000-300,000.',
      'Foodpanda commission bhi bachti hai — PKR 15K+/day.',
    ],
  },
  'whatsapp-vs-foodpanda': {
    title: 'WhatsApp direct orders vs Foodpanda: commission comparison',
    date: 'July 1, 2026',
    tag: 'Business',
    readTime: '6 min',
    content: [
      'Foodpanda, Careem, EatOye — sab 25-30% commission lete hain. Ek PKR 1,000 order pe restaurant ko PKR 700-750 milta hai.',
      'WhatsApp direct order: 0% commission. PKR 1,000 ka order = PKR 1,000 restaurant ko. PKR 250-300 saving per order.',
      'Lekin WhatsApp pe manual order management mushkil hai — koi 24/7 reply nahi karta, orders track nahi hote, menu repeat nahi hota.',
      'SellBot.pk is masle ko solve karta hai. AI 24/7 replies, orders database me store, COD verification, daily report. Sab automated.',
      'Net result: Foodpanda se 25-30% zyada profit per order + 24/7 availability + zero manual work.',
    ],
  },
}

export const dynamic = 'force-dynamic'

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
            <h3 className="text-xl font-bold mb-3">Aap bhi try karein</h3>
            <p className="text-sm text-[#8B9DB8] mb-6">14 din free trial. Koi credit card nahi. 5 minute me setup.</p>
            <Link href="/onboarding" className="btn-electric px-8 py-3 rounded-lg inline-block">
              Free Trial Shuru Karein →
            </Link>
          </div>
        </div>
      </section>

      <div className="py-16" />
      <MarketingFooter />
    </main>
  )
}
