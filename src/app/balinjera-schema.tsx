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

const RESTAURANT_DESCRIPTION: Record<BalinjeraLang, string> = {
  he: 'מסעדה אתיופית כשרה בכרם התימנים, ליד שוק הכרמל בתל אביב, המתמחה באינג׳רה טרייה ובמטבח אתיופי מסורתי.',
  en: 'Kosher Ethiopian restaurant in Kerem HaTeimanim, next to Carmel Market in Tel Aviv, specializing in fresh injera and traditional Ethiopian cuisine.',
}

// Google + TripAdvisor both show 4.7/5 as of 2026-07-19. TripAdvisor's count (178,
// directly from its listing page) is used as reviewCount since it's the more precise
// per-platform figure; re-verify periodically, review counts drift upward over time.
const AGGREGATE_RATING: JsonLd = {
  '@type': 'AggregateRating',
  ratingValue: '4.7',
  bestRating: '5',
  reviewCount: '178',
}

export function buildRestaurantSchema(lang: BalinjeraLang): JsonLd {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    name: 'Balinjera',
    alternateName: 'באלינג׳רה',
    description: RESTAURANT_DESCRIPTION[lang],
    url: siteUrl,
    telephone: BALINJERA_PHONE_HREF.replace('tel:', ''),
    email: BALINJERA_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Malan 4 / HaKovshim 39',
      addressLocality: 'Tel Aviv',
      addressRegion: 'Tel Aviv District',
      postalCode: '6560475',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.0698574,
      longitude: 34.7665593,
    },
    servesCuisine: 'Ethiopian',
    priceRange: '₪10-₪160',
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
    hasMenu: getLocalizedUrl('/menu', lang),
    acceptsReservations: true,
    aggregateRating: AGGREGATE_RATING,
    sameAs: [
      'https://www.instagram.com/ethiopianfoodrestaurant/',
      'https://www.facebook.com/Traditional.Ethiopian.Cuisine/',
      BALINJERA_ORDER_HREF,
    ],
  }
}

export function buildFaqPageSchema(lang: BalinjeraLang): JsonLd {
  const faq = balinjeraCopy[lang].faq

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildEventsServiceSchema(lang: BalinjeraLang): JsonLd {
  const siteUrl = getSiteUrl()
  const eventsPage = balinjeraCopy[lang].eventsPage

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: lang === 'he' ? 'אירועים וקייטרינג אתיופי' : 'Ethiopian catering and private events',
    name: eventsPage.eventSeo.title,
    description: eventsPage.body,
    provider: {
      '@type': 'Restaurant',
      name: 'Balinjera',
      url: siteUrl,
      telephone: BALINJERA_PHONE_HREF.replace('tel:', ''),
    },
    areaServed: {
      '@type': 'City',
      name: 'Tel Aviv',
    },
    url: getLocalizedUrl('/events', lang),
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
  const single = price.match(/^(\d+)\s*₪$/)

  if (single) {
    return {
      '@type': 'Offer',
      price: single[1],
      priceCurrency: 'ILS',
    }
  }

  const range = price.match(/^(\d+)\/(\d+)\s*₪$/)

  if (range) {
    const [, first, second] = range
    const low = Math.min(Number(first), Number(second))
    const high = Math.max(Number(first), Number(second))

    return {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: low,
        maxPrice: high,
        priceCurrency: 'ILS',
      },
    }
  }

  return undefined
}

const VEGAN_PATTERN = /טבעונ|vegan/i
const MEAT_PATTERN = /בשר|meat/i

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
        const description = 'description' in item ? item.description : undefined
        const combinedText = `${item.name} ${description ?? ''}`
        const isVegan = VEGAN_PATTERN.test(combinedText) && !MEAT_PATTERN.test(combinedText)

        return {
          '@type': 'MenuItem',
          name: item.name,
          ...(description ? { description } : {}),
          ...(offer ? { offers: offer } : {}),
          ...(isVegan ? { suitableForDiet: 'https://schema.org/VeganDiet' } : {}),
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
