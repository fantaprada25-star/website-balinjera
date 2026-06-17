import { resolveLang } from "../balinjera-content";
import { BalinjeraFrame, BlogPageContent } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraBlogPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame active="blog" currentPath="/blog" lang={lang}>
      <BlogPageContent lang={lang} />
    </BalinjeraFrame>
  );
}
