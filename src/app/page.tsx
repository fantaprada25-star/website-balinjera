import { resolveLang } from "./balinjera-content";
import { BalinjeraFrame, HomePageContent } from "./balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame active="home" currentPath="/" lang={lang}>
      <HomePageContent lang={lang} />
    </BalinjeraFrame>
  );
}
