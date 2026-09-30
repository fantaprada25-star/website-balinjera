import type { MetadataRoute } from 'next'

import { getBlogPost, getBlogPostSlugs } from './balinjera-content'
import { getLanguageAlternates, getLocalizedUrl } from './balinjera-seo'

// Real content dates, not the build time: Google only trusts lastmod when it
// is consistently accurate. Bump the matching date when a page's copy changes.
const STATIC_ROUTE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-09-29',
  '/about': '2026-09-29',
  '/menu': '2026-09-29',
  '/events': '2026-09-29',
  '/blog': '2026-09-29',
  '/accessibility': '2026-06-17',
}

function getArticleLastModified(slug: string): string {
  const dates = (['he', 'en'] as const).map(
    (lang) => getBlogPost(lang, slug)?.modifiedAt ?? ''
  )

  return dates.sort().at(-1) ?? ''
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...Object.entries(STATIC_ROUTE_LAST_MODIFIED).map(([route, lastModified]) => ({
      route,
      lastModified,
    })),
    ...getBlogPostSlugs().map((slug) => ({
      route: `/blog/${slug}`,
      lastModified: getArticleLastModified(slug),
    })),
  ]

  return routes.flatMap(({ route, lastModified }) =>
    (['he', 'en'] as const).map((lang) => ({
      url: getLocalizedUrl(route, lang),
      lastModified,
      alternates: {
        languages: getLanguageAlternates(route),
      },
    }))
  )
}
