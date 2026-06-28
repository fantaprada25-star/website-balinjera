import type { Metadata } from 'next'

import type { BalinjeraLang } from './balinjera-content'

const DEFAULT_SITE_URL = 'https://www.balinjera.com'

export function getSiteUrl(): string {
  return (process.env['NEXT_PUBLIC_SITE_URL'] ?? DEFAULT_SITE_URL).replace(/\/$/, '')
}

export function getLocalizedUrl(path: string, lang: BalinjeraLang): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const baseUrl = `${getSiteUrl()}${normalizedPath}`

  return lang === 'en' ? `${baseUrl}?lang=en` : baseUrl
}

export function getLanguageAlternates(path: string): Record<string, string> {
  return {
    he: getLocalizedUrl(path, 'he'),
    en: getLocalizedUrl(path, 'en'),
    'x-default': getLocalizedUrl(path, 'he'),
  }
}

export function buildPageMeta({
  lang,
  title,
  description,
  ogType = 'website',
}: {
  lang: BalinjeraLang
  title: string
  description: string
  ogType?: 'website' | 'article'
}): Metadata {
  const siteUrl = getSiteUrl()

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Balinjera',
      images: [
        {
          url: `${siteUrl}/balinjera/hero.jpg`,
          width: 1280,
          height: 720,
          alt: lang === 'he' ? 'מסעדת באלינג׳רה' : 'Balinjera Restaurant',
        },
      ],
      locale: lang === 'he' ? 'he_IL' : 'en_US',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/balinjera/hero.jpg`],
    },
  }
}
