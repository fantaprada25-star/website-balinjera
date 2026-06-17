import { resolveLang } from "../balinjera-content";
import { AccessibilityPageContent, BalinjeraFrame } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraAccessibilityPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame
      active="accessibility"
      currentPath="/accessibility"
      lang={lang}
    >
      <AccessibilityPageContent lang={lang} />
    </BalinjeraFrame>
  );
}
