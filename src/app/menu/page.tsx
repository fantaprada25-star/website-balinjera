import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { buildPageMeta } from '../balinjera-seo'
import { BalinjeraFrame, MenuPageContent } from '../balinjera-shell'

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
    path: '/menu',
    title:
      lang === 'he'
        ? 'התפריט | מסעדת באלינג׳רה — מנות אתיופיות תל אביב'
        : 'Menu — Balinjera Ethiopian Restaurant Tel Aviv',
    description:
      lang === 'he'
        ? 'גלו את תפריט באלינג׳רה — מנות אתיופיות מסורתיות, אינג׳רה טרייה, מבחר טבעוני. כשר. כרם התימנים, תל אביב.'
        : "Explore Balinjera's menu — traditional Ethiopian dishes, fresh injera, vegan options. Kosher. Kerem HaTeimanim, Tel Aviv.",
  })
}

export default async function BalinjeraMenuPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <BalinjeraFrame active="menu" currentPath="/menu" lang={lang}>
      <MenuPageContent lang={lang} />
    </BalinjeraFrame>
  )
}
