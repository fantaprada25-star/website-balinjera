import { resolveLang } from "../balinjera-content";
import { AboutPageContent, BalinjeraFrame } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraAboutPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame active="about" currentPath="/about" lang={lang}>
      <AboutPageContent lang={lang} />
    </BalinjeraFrame>
  );
}
