import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { buildPageMeta } from '../balinjera-seo'
import { BalinjeraFrame, BlogPageContent } from '../balinjera-shell'

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
    path: '/blog',
    title:
      lang === 'he'
        ? 'בלוג | מסעדת באלינג׳רה — מטבח אתיופי ואינג׳רה'
        : 'Blog — Balinjera | Ethiopian Cuisine & Injera',
    description:
      lang === 'he'
        ? 'מאמרים על המטבח האתיופי, אינג׳רה ותרבות האוכל של באלינג׳רה. קראו ולמדו.'
        : "Articles about Ethiopian cuisine, injera, and Balinjera's food culture. Read and discover.",
  })
}

export default async function BalinjeraBlogPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams
}) {
  const params = await searchParams
  const lang = resolveLang(params?.lang)

  return (
    <BalinjeraFrame active="blog" currentPath="/blog" lang={lang}>
      <BlogPageContent lang={lang} />
    </BalinjeraFrame>
  )
}
