import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  balinjeraCopy,
  getBlogPost,
  getBlogPostSlugs,
  resolveLang,
} from '../../balinjera-content'
import { buildPageMeta } from '../../balinjera-seo'
import { BalinjeraFrame, BlogArticlePageContent } from '../../balinjera-shell'

type BalinjeraArticleParams = Promise<{
  slug: string
}>

type BalinjeraSearchParams = Promise<{
  lang?: string | string[]
}>

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: BalinjeraArticleParams
  searchParams: BalinjeraSearchParams
}): Promise<Metadata> {
  const { slug } = await params
  const { lang: rawLang } = await searchParams
  const lang = resolveLang(rawLang)
  const copy = balinjeraCopy[lang]
  const post = copy.blogPage.posts.find((p) => p.slug === slug)
  if (!post) return {}
  const suffix = lang === 'he' ? ' | מסעדת באלינג׳רה' : ' | Balinjera'
  return buildPageMeta({
    lang,
    path: `/blog/${slug}`,
    title: `${post.title}${suffix}`,
    description: post.excerpt,
    ogType: 'article',
  })
}

export default async function BalinjeraBlogArticlePage({
  params,
  searchParams,
}: {
  params: BalinjeraArticleParams
  searchParams?: BalinjeraSearchParams
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const lang = resolveLang(query?.lang)
  const post = getBlogPost(lang, slug)

  if (!post) {
    notFound()
  }

  return (
    <BalinjeraFrame
      active="blog"
      currentPath={`/blog/${slug}`}
      lang={lang}
    >
      <BlogArticlePageContent lang={lang} post={post} />
    </BalinjeraFrame>
  )
}
