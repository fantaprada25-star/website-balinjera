import type { Metadata } from 'next'

import { resolveLang } from './balinjera-content'
import { buildPageMeta } from './balinjera-seo'
import { BalinjeraFrame, HomePageContent } from './balinjera-shell'

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
    <BalinjeraFrame active="home" currentPath="/" lang={lang}>
      <HomePageContent lang={lang} />
    </BalinjeraFrame>
  )
}
