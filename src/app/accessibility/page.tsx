import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { SchemaScript } from '../balinjera-schema'
import { buildPageMeta } from '../balinjera-seo'
import { AccessibilityPageContent, BalinjeraFrame } from '../balinjera-shell'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://balinjera.vercel.app'

const breadcrumbSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Balinjera', item: siteUrl + '/' },
    { '@type': 'ListItem', position: 2, name: 'Accessibility', item: siteUrl + '/accessibility' },
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
    path: '/accessibility',
    title:
      lang === 'he'
        ? 'הצהרת נגישות | מסעדת באלינג׳רה'
        : 'Accessibility Statement | Balinjera Restaurant',
    description:
      lang === 'he'
        ? 'הצהרת הנגישות הדיגיטלית של מסעדת באלינג׳רה. מחויבים לנגישות לפי תקן WCAG 2.0 AA.'
        : "Balinjera's digital accessibility statement. Committed to WCAG 2.0 AA standards.",
  })
}

export default async function BalinjeraAccessibilityPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <BalinjeraFrame
        active="accessibility"
        currentPath="/accessibility"
        lang={lang}
      >
        <AccessibilityPageContent lang={lang} />
      </BalinjeraFrame>
    </>
  )
}
