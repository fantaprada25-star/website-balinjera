import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://balinjera.vercel.app'

export function getSiteUrl(): string {
  return process.env['NEXT_PUBLIC_SITE_URL'] ?? DEFAULT_SITE_URL
}

export function buildPageMeta({
  lang,
  path,
  title,
  description,
  ogType = 'website',
}: {
  lang: 'he' | 'en'
  path: string
  title: string
  description: string
  ogType?: 'website' | 'article'
}): Metadata {
  const siteUrl = getSiteUrl()
  const heUrl = `${siteUrl}${path}`
  const enUrl = `${siteUrl}${path}?lang=en`
  const canonical = lang === 'en' ? enUrl : heUrl

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        he: heUrl,
        en: enUrl,
        'x-default': heUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
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
