import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  balinjeraCopy,
  getBlogPost,
  getBlogPostSlugs,
  resolveLang,
} from '../../balinjera-content'
import { SchemaScript } from '../../balinjera-schema'
import { buildPageMeta } from '../../balinjera-seo'
import { BalinjeraFrame, BlogArticlePageContent } from '../../balinjera-shell'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://balinjera.vercel.app'

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

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    inLanguage: lang === 'he' ? 'he-IL' : 'en',
    url: `${siteUrl}/blog/${slug}`,
    image: `${siteUrl}/balinjera/hero.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Balinjera',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Balinjera',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/balinjera/logo.png`,
      },
    },
  }

  const crumbSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Balinjera', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${slug}` },
    ],
  }

  return (
    <>
      <SchemaScript schema={articleSchema} />
      <SchemaScript schema={crumbSchema} />
      <BalinjeraFrame
        active="blog"
        currentPath={`/blog/${slug}`}
        lang={lang}
      >
        <BlogArticlePageContent lang={lang} post={post} />
      </BalinjeraFrame>
    </>
  )
}
