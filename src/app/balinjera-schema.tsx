import {
  BALINJERA_EMAIL,
  BALINJERA_OPENING_HOURS,
  BALINJERA_ORDER_HREF,
  BALINJERA_PHONE_HREF,
  getUpcomingSpecialHours,
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

// No aggregateRating: Google's review-snippet guidelines forbid ratings
// aggregated from other sites, and a business's own LocalBusiness pages are
// ineligible for stars anyway (policy re-checked 2026-09-29). Google shows the
// GBP rating (4.7★, 1,560 reviews in Sep 2026) in the local panel on its own.

function buildPriceRange(lang: BalinjeraLang): string {
  const prices = balinjeraCopy[lang].menuPage.sections.flatMap((section) =>
    section.items.flatMap((item) =>
      (item.price.match(/\d+/g) ?? []).map(Number)
    )
  )

  return prices.length > 0
    ? `₪${Math.min(...prices)}-₪${Math.max(...prices)}`
    : '₪₪'
}

export function buildRestaurantSchema(lang: BalinjeraLang): JsonLd {
  const siteUrl = getSiteUrl()
  const specialHours = getUpcomingSpecialHours(60)

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
    priceRange: buildPriceRange(lang),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        ...BALINJERA_OPENING_HOURS.sundayToThursday,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        ...BALINJERA_OPENING_HOURS.friday,
      },
    ],
    ...(specialHours.length > 0
      ? {
          // Google convention: opens = closes = 00:00 means closed all day.
          specialOpeningHoursSpecification: specialHours.map((entry) => ({
            '@type': 'OpeningHoursSpecification',
            validFrom: entry.date,
            validThrough: entry.date,
            opens: 'closed' in entry ? '00:00' : entry.opens,
            closes: 'closed' in entry ? '00:00' : entry.closes,
          })),
        }
      : {}),
    image: `${siteUrl}/balinjera/hero.jpg`,
    hasMenu: getLocalizedUrl('/menu', lang),
    acceptsReservations: true,
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
const MEAT_PATTERN = /בשר|עוף|בקר|meat|chicken|beef/i

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
