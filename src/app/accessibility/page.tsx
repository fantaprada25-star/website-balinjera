import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { buildPageMeta } from '../balinjera-seo'
import { AccessibilityPageContent, BalinjeraFrame } from '../balinjera-shell'

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
    <BalinjeraFrame
      active="accessibility"
      currentPath="/accessibility"
      lang={lang}
    >
      <AccessibilityPageContent lang={lang} />
    </BalinjeraFrame>
  )
}
