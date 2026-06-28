import {
  BALINJERA_EMAIL,
  BALINJERA_ORDER_HREF,
  BALINJERA_PHONE_HREF,
  type BalinjeraBlogPost,
  type BalinjeraLang,
  type BalinjeraPageKey,
  balinjeraCopy,
} from './balinjera-content'
import { getLocalizedUrl, getSiteUrl } from './balinjera-seo'

type JsonLd = Record<string, unknown>

export function SchemaScript({
  schema,
}: {
  schema: JsonLd | readonly JsonLd[]
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function getPageLabel(lang: BalinjeraLang, page: BalinjeraPageKey) {
  const copy = balinjeraCopy[lang]

  if (page === 'accessibility') {
    return copy.accessibilityPage.title
  }

  return copy.nav.find((item) => item.key === page)?.label ?? page
}

export function buildRestaurantSchema(): JsonLd {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    name: 'Balinjera',
    alternateName: 'באלינג׳רה',
    description:
      'Traditional Ethiopian restaurant in Tel Aviv, specializing in injera and traditional Ethiopian cuisine.',
    url: siteUrl,
    telephone: BALINJERA_PHONE_HREF.replace('tel:', ''),
    email: BALINJERA_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Malan 4 / HaKovshim 39',
      addressLocality: 'Tel Aviv',
      addressRegion: 'Tel Aviv District',
      addressCountry: 'IL',
    },
    servesCuisine: 'Ethiopian',
    priceRange: '₪₪',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '12:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '11:00',
        closes: '15:00',
      },
    ],
    image: `${siteUrl}/balinjera/hero.jpg`,
    hasMenu: getLocalizedUrl('/menu', 'he'),
    acceptsReservations: true,
    sameAs: [
      'https://www.instagram.com/ethiopianfoodrestaurant/',
      'https://www.facebook.com/Traditional.Ethiopian.Cuisine/',
      BALINJERA_ORDER_HREF,
    ],
  }
}

export function buildBreadcrumbSchema({
  lang,
  items,
}: {
  lang: BalinjeraLang
  items: Array<{ name: string; path: string }>
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getLocalizedUrl(item.path, lang),
    })),
  }
}

export function buildPageBreadcrumbSchema({
  lang,
  page,
  path,
}: {
  lang: BalinjeraLang
  page: BalinjeraPageKey
  path: string
}): JsonLd {
  return buildBreadcrumbSchema({
    lang,
    items: [
      { name: 'Balinjera', path: '/' },
      { name: getPageLabel(lang, page), path },
    ],
  })
}

function buildOffer(price: string): JsonLd | undefined {
  const match = price.match(/^(\d+)\s*₪$/)

  if (!match) {
    return undefined
  }

  return {
    '@type': 'Offer',
    price: match[1],
    priceCurrency: 'ILS',
  }
}

export function buildMenuSchema(lang: BalinjeraLang): JsonLd {
  const menu = balinjeraCopy[lang].menuPage

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: lang === 'he' ? 'תפריט באלינג׳רה' : 'Balinjera Menu',
    inLanguage: lang === 'he' ? 'he-IL' : 'en-US',
    url: getLocalizedUrl('/menu', lang),
    hasMenuSection: menu.sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.title,
      hasMenuItem: section.items.map((item) => {
        const offer = buildOffer(item.price)

        return {
          '@type': 'MenuItem',
          name: item.name,
          ...('description' in item && item.description
            ? { description: item.description }
            : {}),
          ...(offer ? { offers: offer } : {}),
        }
      }),
    })),
  }
}

export function buildBlogPostingSchema({
  lang,
  post,
}: {
  lang: BalinjeraLang
  post: BalinjeraBlogPost
}): JsonLd {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    inLanguage: lang === 'he' ? 'he-IL' : 'en-US',
    url: getLocalizedUrl(`/blog/${post.slug}`, lang),
    image: `${siteUrl}/balinjera/hero.jpg`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    author: {
      '@type': 'Organization',
      name: 'Balinjera',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Balinjera',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/balinjera/logo.png`,
      },
    },
  }
}

export function buildBlogArticleBreadcrumbSchema({
  lang,
  post,
}: {
  lang: BalinjeraLang
  post: BalinjeraBlogPost
}): JsonLd {
  return buildBreadcrumbSchema({
    lang,
    items: [
      { name: 'Balinjera', path: '/' },
      { name: getPageLabel(lang, 'blog'), path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ],
  })
}
