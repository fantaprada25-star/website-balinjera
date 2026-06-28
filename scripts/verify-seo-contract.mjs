import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const CANONICAL_HOST = 'https://www.balinjera.com'
const OLD_HOST = 'https://balinjera.vercel.app'

const files = {
  layout: 'src/app/layout.tsx',
  seo: 'src/app/balinjera-seo.ts',
  schema: 'src/app/balinjera-schema.tsx',
  content: 'src/app/balinjera-content.ts',
  sitemap: 'src/app/sitemap.ts',
  robots: 'src/app/robots.ts',
  llms: 'public/llms.txt',
  shell: 'src/app/balinjera-shell.tsx',
  home: 'src/app/page.tsx',
  about: 'src/app/about/page.tsx',
  menu: 'src/app/menu/page.tsx',
  events: 'src/app/events/page.tsx',
  blog: 'src/app/blog/page.tsx',
  accessibility: 'src/app/accessibility/page.tsx',
  article: 'src/app/blog/[slug]/page.tsx',
}

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

const source = Object.fromEntries(
  Object.entries(files).map(([key, path]) => [key, read(path)]),
)

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

for (const [key, content] of Object.entries(source)) {
  assert(!content.includes(OLD_HOST), `${files[key]} still references ${OLD_HOST}`)
}

assert(
  source.seo.includes(`const DEFAULT_SITE_URL = '${CANONICAL_HOST}'`),
  'SEO fallback site URL must be https://www.balinjera.com',
)
assert(
  source.layout.includes(`const DEFAULT_SITE_URL = '${CANONICAL_HOST}'`) ||
    source.layout.includes("import { getSiteUrl } from './balinjera-seo'"),
  'layout metadataBase must use the canonical www domain helper',
)
assert(
  source.seo.includes('getLocalizedUrl') && source.seo.includes('getLanguageAlternates'),
  'SEO helpers must expose localized URL and language alternate builders',
)
assert(
  source.sitemap.includes('getLanguageAlternates') && source.seo.includes("'x-default'"),
  'sitemap must include language alternates with x-default',
)
assert(
  source.robots.includes('GPTBot') &&
    source.robots.includes('ClaudeBot') &&
    source.robots.includes('PerplexityBot') &&
    source.robots.includes('Google-Extended'),
  'robots policy must explicitly mention AI crawler rules',
)
assert(
  source.llms.includes(CANONICAL_HOST) && !source.llms.includes('balinjera.vercel.app'),
  'llms.txt must use www.balinjera.com and not balinjera.vercel.app',
)
assert(
  source.content.includes('seo:') &&
    source.content.includes('blogArticleTitleSuffix') &&
    source.content.includes('publishedAt:') &&
    source.content.includes('modifiedAt:'),
  'bilingual content must include SEO copy and article dates',
)
assert(
  source.schema.includes('buildRestaurantSchema') &&
    source.schema.includes('buildBreadcrumbSchema') &&
    source.schema.includes('buildMenuSchema') &&
    source.schema.includes('buildBlogPostingSchema'),
  'schema builders for restaurant, breadcrumb, menu, and blog posting must exist',
)
assert(
  source.schema.includes("'@type': 'Menu'") &&
    source.schema.includes('datePublished') &&
    source.schema.includes('dateModified'),
  'schema builders must emit Menu and BlogPosting dates',
)
assert(
  !source.home.includes('const restaurantSchema') &&
    !source.article.includes('const articleSchema') &&
    !source.article.includes('const crumbSchema'),
  'route files must not keep inline restaurant/article/breadcrumb schema literals',
)
for (const key of ['about', 'menu', 'events', 'blog', 'accessibility']) {
  assert(
    !source[key].includes('const breadcrumbSchema'),
    `${files[key]} must use centralized breadcrumb schema builder`,
  )
}
assert(
  !source.shell.includes('rel="noreferrer"') && source.shell.includes('rel="noopener noreferrer"'),
  'external links must use rel="noopener noreferrer"',
)

if (failures.length > 0) {
  console.error('SEO contract check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('SEO contract check passed')
