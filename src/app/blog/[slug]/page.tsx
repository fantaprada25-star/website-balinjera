import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePageContent } from "../../balinjera-blog-article-content";
import {
  balinjeraCopy,
  getBlogPost,
  getBlogPostSlugs,
  resolveLang,
} from "../../balinjera-content";
import {
  buildBlogArticleBreadcrumbSchema,
  buildBlogPostingSchema,
  SchemaScript,
} from "../../balinjera-schema";
import { buildPageMeta } from "../../balinjera-seo";
import { SeoLinkTags } from "../../balinjera-seo-links";
import { BalinjeraFrame } from "../../balinjera-shell";

type BalinjeraArticleParams = Promise<{
  slug: string;
}>;

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: BalinjeraArticleParams;
  searchParams: BalinjeraSearchParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang: rawLang } = await searchParams;
  const lang = resolveLang(rawLang);
  const copy = balinjeraCopy[lang];
  const post = copy.blogPage.posts.find((p) => p.slug === slug);
  if (!post) return {};

  return buildPageMeta({
    lang,
    title: `${post.title}${copy.seo.blogArticleTitleSuffix}`,
    description: post.excerpt,
    ogType: "article",
  });
}

export default async function BalinjeraBlogArticlePage({
  params,
  searchParams,
}: {
  params: BalinjeraArticleParams;
  searchParams?: BalinjeraSearchParams;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const lang = resolveLang(query?.lang);
  const post = getBlogPost(lang, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SeoLinkTags lang={lang} path={`/blog/${post.slug}`} />
      <SchemaScript
        schema={[
          buildBlogPostingSchema({ lang, post }),
          buildBlogArticleBreadcrumbSchema({ lang, post }),
        ]}
      />
      <BalinjeraFrame active="blog" currentPath={`/blog/${slug}`} lang={lang}>
        <BlogArticlePageContent lang={lang} post={post} />
      </BalinjeraFrame>
    </>
  );
}
