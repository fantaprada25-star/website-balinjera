import type { MetadataRoute } from 'next'

import { getBlogPostSlugs } from './balinjera-content'
import { getLanguageAlternates, getLocalizedUrl } from './balinjera-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = ['/', '/about', '/menu', '/events', '/blog', '/accessibility']
  const articleRoutes = getBlogPostSlugs().map((slug) => `/blog/${slug}`)

  return [...staticRoutes, ...articleRoutes].map((route) => ({
    url: getLocalizedUrl(route, 'he'),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 0.8 : 0.6,
    alternates: {
      languages: getLanguageAlternates(route),
    },
  }))
}
