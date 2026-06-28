import type { Metadata } from "next";

import { BlogPageContent } from "../balinjera-blog-content";
import { balinjeraCopy, resolveLang } from "../balinjera-content";
import { buildPageBreadcrumbSchema, SchemaScript } from "../balinjera-schema";
import { buildPageMeta } from "../balinjera-seo";
import { SeoLinkTags } from "../balinjera-seo-links";
import { BalinjeraFrame } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: BalinjeraSearchParams;
}): Promise<Metadata> {
  const { lang: rawLang } = await searchParams;
  const lang = resolveLang(rawLang);
  const copy = balinjeraCopy[lang];

  return buildPageMeta({
    lang,
    title: copy.seo.pages.blog.title,
    description: copy.seo.pages.blog.description,
  });
}

export default async function BalinjeraBlogPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <>
      <SeoLinkTags lang={lang} path="/blog" />
      <SchemaScript
        schema={buildPageBreadcrumbSchema({
          lang,
          page: "blog",
          path: "/blog",
        })}
      />
      <BalinjeraFrame active="blog" currentPath="/blog" lang={lang}>
        <BlogPageContent lang={lang} />
      </BalinjeraFrame>
    </>
  );
}
