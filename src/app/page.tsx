import type { Metadata } from 'next'

import { balinjeraCopy, resolveLang } from './balinjera-content'
import { buildRestaurantSchema, SchemaScript } from './balinjera-schema'
import { buildPageMeta } from './balinjera-seo'
import { SeoLinkTags } from './balinjera-seo-links'
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
  const copy = balinjeraCopy[lang]

  return buildPageMeta({
    lang,
    title: copy.seo.pages.home.title,
    description: copy.seo.pages.home.description,
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
      <SeoLinkTags lang={lang} path="/" />
      <SchemaScript schema={buildRestaurantSchema()} />
      <BalinjeraFrame active="home" currentPath="/" lang={lang}>
        <HomePageContent lang={lang} />
      </BalinjeraFrame>
    </>
  )
}
