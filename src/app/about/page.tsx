import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { buildPageMeta } from '../balinjera-seo'
import { AboutPageContent, BalinjeraFrame } from '../balinjera-shell'

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
    path: '/about',
    title:
      lang === 'he'
        ? 'על באלינג׳רה — הסיפור שלנו | מסעדה אתיופית תל אביב'
        : 'About Balinjera — Our Story | Ethiopian Restaurant Tel Aviv',
    description:
      lang === 'he'
        ? 'הכירו את הסיפור מאחורי מסעדת באלינג׳רה — מטבח אתיופי אותנטי עם לב, בכרם התימנים תל אביב.'
        : 'Learn the story behind Balinjera — authentic Ethiopian cuisine served with heart in Kerem HaTeimanim, Tel Aviv.',
  })
}

export default async function BalinjeraAboutPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <BalinjeraFrame active="about" currentPath="/about" lang={lang}>
      <AboutPageContent lang={lang} />
    </BalinjeraFrame>
  )
}
