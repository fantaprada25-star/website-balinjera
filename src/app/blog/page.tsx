import type { Metadata } from 'next'

import { resolveLang } from '../balinjera-content'
import { SchemaScript } from '../balinjera-schema'
import { buildPageMeta } from '../balinjera-seo'
import { BalinjeraFrame, BlogPageContent } from '../balinjera-shell'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://balinjera.vercel.app'

const breadcrumbSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Balinjera', item: siteUrl + '/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: siteUrl + '/blog' },
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
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <BalinjeraFrame active="blog" currentPath="/blog" lang={lang}>
        <BlogPageContent lang={lang} />
      </BalinjeraFrame>
    </>
  )
}
