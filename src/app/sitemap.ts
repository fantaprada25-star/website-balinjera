import type { MetadataRoute } from 'next'

import { getBlogPostSlugs } from './balinjera-content'

const DEFAULT_SITE_URL = 'https://balinjera.vercel.app'

function getSiteUrl() {
  return process.env['NEXT_PUBLIC_SITE_URL'] ?? DEFAULT_SITE_URL
}

function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticRoutes = ['/', '/about', '/menu', '/events', '/blog', '/accessibility']
  const articleRoutes = getBlogPostSlugs().map((slug) => `/blog/${slug}`)

  return [...staticRoutes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 0.8 : 0.6,
    alternates: {
      languages: {
        he: absoluteUrl(route),
        en: `${siteUrl}${route}?lang=en`,
      },
    },
  }))
}
