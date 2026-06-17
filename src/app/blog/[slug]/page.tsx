import { notFound } from "next/navigation";

import {
  getBlogPost,
  getBlogPostSlugs,
  resolveLang,
} from "../../balinjera-content";
import { BalinjeraFrame, BlogArticlePageContent } from "../../balinjera-shell";

type BalinjeraArticleParams = Promise<{
  slug: string;
}>;

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
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
    <BalinjeraFrame
      active="blog"
      currentPath={`/blog/${slug}`}
      lang={lang}
    >
      <BlogArticlePageContent lang={lang} post={post} />
    </BalinjeraFrame>
  );
}
