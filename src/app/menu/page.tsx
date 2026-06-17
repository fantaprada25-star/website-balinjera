import { resolveLang } from "../balinjera-content";
import { BalinjeraFrame, MenuPageContent } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraMenuPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame active="menu" currentPath="/menu" lang={lang}>
      <MenuPageContent lang={lang} />
    </BalinjeraFrame>
  );
}
