import type { Metadata } from 'next'

import { resolveLang } from './balinjera-content'
import { SchemaScript } from './balinjera-schema'
import { buildPageMeta } from './balinjera-seo'
import { BalinjeraFrame, HomePageContent } from './balinjera-shell'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://balinjera.vercel.app'

const restaurantSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'LocalBusiness'],
  name: 'Balinjera',
  alternateName: 'באלינגʼרה',
  description: 'Traditional Ethiopian restaurant in Tel Aviv, specializing in injera and traditional Ethiopian cuisine.',
  url: siteUrl,
  telephone: '+97235252527',
  email: 'fantaprada25@gmail.com',
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
  hasMenu: `${siteUrl}/menu`,
  acceptsReservations: true,
  sameAs: [
    'https://www.instagram.com/ethiopianfoodrestaurant/',
    'https://www.facebook.com/Traditional.Ethiopian.Cuisine/',
    'https://wolt.com/he/isr/tel-aviv/restaurant/balinjera',
  ],
}

type BalinjeraSearchParams = Promise<{
  lang?: string | string[]
}>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BalinjeraSearchParams
}): Promise<Metadata> {
  const { lang: rawLang } = await searchParams
  const lang = resolveLang(rawLang)
  return buildPageMeta({
    lang,
    path: '/',
    title:
      lang === 'he'
        ? 'מסעדת באלינג׳רה — מטבח אתיופי מסורתי בתל אביב'
        : 'Balinjera — Traditional Ethiopian Restaurant in Tel Aviv',
    description:
      lang === 'he'
        ? 'מסעדת באלינג׳רה בכרם התימנים, תל אביב. מטבח אתיופי אותנטי, אינג׳רה טרייה ואווירה חמה. הזמינו שולחן או קייטרינג אתיופי.'
        : 'Balinjera in Kerem HaTeimanim, Tel Aviv. Authentic Ethiopian cuisine, fresh injera, warm atmosphere. Reserve a table or book Ethiopian catering.',
  })
}

export default async function BalinjeraPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <>
      <SchemaScript schema={restaurantSchema} />
      <BalinjeraFrame active="home" currentPath="/" lang={lang}>
        <HomePageContent lang={lang} />
      </BalinjeraFrame>
    </>
  )
}
