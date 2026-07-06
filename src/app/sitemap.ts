import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sellbot.app'
  const lastModified = new Date()

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/blog',
    '/onboarding',
    '/dashboard',
    '/dashboard/connect',
    '/dashboard/orders',
    '/dashboard/conversations',
    '/dashboard/products',
  ]

  const blogSlugs = [
    'missed-sales-problem',
    'multilingual-ai',
    'cod-verification-savings',
    'clothing-brand-case-study',
    'restaurant-automation',
    'direct-orders-vs-platforms',
  ]

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
