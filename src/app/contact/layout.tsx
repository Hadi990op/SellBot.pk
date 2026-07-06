import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — SellBot',
  description: 'Get in touch with the SellBot team. Questions, demos, or custom plans — we reply within 24 hours.',
  openGraph: {
    title: 'Contact — SellBot',
    description: 'Get in touch with the SellBot team.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
