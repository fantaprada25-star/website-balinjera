import type { Metadata } from "next";

import { balinjeraCopy, resolveLang } from "../balinjera-content";
import { buildPageBreadcrumbSchema, SchemaScript } from "../balinjera-schema";
import { buildPageMeta } from "../balinjera-seo";
import { SeoLinkTags } from "../balinjera-seo-links";
import { BalinjeraFrame } from "../balinjera-shell";

import { AboutPageContent } from "./about-content";

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
    title: copy.seo.pages.about.title,
    description: copy.seo.pages.about.description,
  });
}

export default async function BalinjeraAboutPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <>
      <SeoLinkTags lang={lang} path="/about" />
      <SchemaScript
        schema={buildPageBreadcrumbSchema({
          lang,
          page: "about",
          path: "/about",
        })}
      />
      <BalinjeraFrame active="about" currentPath="/about" lang={lang}>
        <AboutPageContent lang={lang} />
      </BalinjeraFrame>
    </>
  );
}
