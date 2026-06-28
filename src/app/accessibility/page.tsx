import type { Metadata } from 'next'

import { balinjeraCopy, resolveLang } from '../balinjera-content'
import { buildPageBreadcrumbSchema, SchemaScript } from '../balinjera-schema'
import { buildPageMeta } from '../balinjera-seo'
import { SeoLinkTags } from '../balinjera-seo-links'
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
  const copy = balinjeraCopy[lang]

  return buildPageMeta({
    lang,
    title: copy.seo.pages.accessibility.title,
    description: copy.seo.pages.accessibility.description,
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
      <SeoLinkTags lang={lang} path="/accessibility" />
      <SchemaScript
        schema={buildPageBreadcrumbSchema({
          lang,
          page: 'accessibility',
          path: '/accessibility',
        })}
      />
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
