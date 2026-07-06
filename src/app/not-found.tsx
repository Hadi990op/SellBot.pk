import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-[#E8EEF7] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#508DFF]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative text-center max-w-md">
        <div className="font-mono text-8xl font-bold text-[#508DFF]/30 mb-4">404</div>
        <h1 className="heading-split text-3xl mb-4">
          Page <span className="heading-accent">nahi mila.</span>
        </h1>
        <p className="text-[#8B9DB8] mb-8">
          Ye page exist nahi karta. Shayad move ho gaya ya delete ho gaya.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-electric px-6 py-3 rounded-lg">
            Home →
          </Link>
          <Link href="/onboarding" className="btn-ghost px-6 py-3 rounded-lg">
            Free Trial
          </Link>
        </div>
      </div>
    </main>
  )
}
