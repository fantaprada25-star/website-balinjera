import { resolveLang } from "../balinjera-content";
import { BalinjeraFrame, EventsPageContent } from "../balinjera-shell";

type BalinjeraSearchParams = Promise<{
  lang?: string | string[];
}>;

export default async function BalinjeraEventsPage({
  searchParams,
}: {
  searchParams?: BalinjeraSearchParams;
}) {
  const params = await searchParams;
  const lang = resolveLang(params?.lang);

  return (
    <BalinjeraFrame active="events" currentPath="/events" lang={lang}>
      <EventsPageContent lang={lang} />
    </BalinjeraFrame>
  );
}
