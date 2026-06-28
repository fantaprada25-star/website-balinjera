import type { BalinjeraLang } from './balinjera-content'
import { getLanguageAlternates, getLocalizedUrl } from './balinjera-seo'

export function SeoLinkTags({
  lang,
  path,
}: {
  lang: BalinjeraLang
  path: string
}) {
  const alternates = getLanguageAlternates(path)
  const canonical = getLocalizedUrl(path, lang)

  return (
    <>
      <link rel="canonical" href={canonical} />
      {Object.entries(alternates).map(([hrefLang, href]) => (
        <link
          href={href}
          hrefLang={hrefLang}
          key={hrefLang}
          rel="alternate"
        />
      ))}
      <meta property="og:url" content={canonical} />
    </>
  )
}
