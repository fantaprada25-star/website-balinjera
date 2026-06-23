import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { SchemaScript } from '../balinjera-schema'
import { buildPageMeta } from '../balinjera-seo'
import { BalinjeraFrame, EventsPageContent } from '../balinjera-shell'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://balinjera.vercel.app'

const breadcrumbSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Balinjera', item: siteUrl + '/' },
    { '@type': 'ListItem', position: 2, name: 'Events', item: siteUrl + '/events' },
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
    path: '/events',
    title:
      lang === 'he'
        ? 'אירועים וקייטרינג אתיופי | מסעדת באלינג׳רה תל אביב'
        : 'Events & Ethiopian Catering | Balinjera Restaurant Tel Aviv',
    description:
      lang === 'he'
        ? 'קייטרינג אתיופי לאירועים פרטיים ומפגשי קבוצות בתל אביב. באלינג׳רה — חוויה ייחודית לכל אירוע. צרו קשר.'
        : 'Ethiopian catering for private events and group dining in Tel Aviv. Balinjera offers a unique experience for every occasion. Contact us.',
  })
}

export default async function BalinjeraEventsPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <BalinjeraFrame active="events" currentPath="/events" lang={lang}>
        <EventsPageContent lang={lang} />
      </BalinjeraFrame>
    </>
  )
}
