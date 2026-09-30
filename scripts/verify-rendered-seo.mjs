const BASE_URL = process.env.SEO_CHECK_BASE_URL ?? 'http://localhost:3000'
const CANONICAL_HOST = 'https://www.balinjera.com'

// Fetch as Googlebot smartphone: without `htmlLimitedBots` Next streams the
// metadata into <body> for this user agent, which is what we guard against.
const GOOGLEBOT_UA =
  'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

async function get(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'user-agent': GOOGLEBOT_UA },
  })

  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`)
  }

  return response.text()
}

function assertIncludes(content, expected, label) {
  if (!content.includes(expected)) {
    throw new Error(`${label} missing: ${expected}`)
  }
}

function assertInHead(content, marker, label) {
  const position = content.indexOf(marker)

  if (position === -1 || position > content.indexOf('</head>')) {
    throw new Error(`${label}: ${marker} must be inside <head>`)
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function assertLinkTag(content, attributes, label) {
  const pattern = new RegExp(
    `<link${attributes
      .map(
        ([name, value]) =>
          `(?=[^>]*${name}="${escapeRegExp(value)}")`,
      )
      .join('')}[^>]*>`,
  )

  if (!pattern.test(content)) {
    throw new Error(
      `${label} missing link: ${attributes
        .map(([name, value]) => `${name}="${value}"`)
        .join(' ')}`,
    )
  }
}

function assertMetaTag(content, attributes, label) {
  const pattern = new RegExp(
    `<meta${attributes
      .map(
        ([name, value]) =>
          `(?=[^>]*${name}="${escapeRegExp(value)}")`,
      )
      .join('')}[^>]*>`,
  )

  if (!pattern.test(content)) {
    throw new Error(
      `${label} missing meta: ${attributes
        .map(([name, value]) => `${name}="${value}"`)
        .join(' ')}`,
    )
  }
}

const checks = [
  {
    path: '/?lang=he',
    expected: [
      '<html lang="he" dir="rtl"',
      'application/ld+json',
    ],
    links: [
      [
        ['rel', 'canonical'],
        ['href', `${CANONICAL_HOST}/`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'he'],
        ['href', `${CANONICAL_HOST}/`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'en'],
        ['href', `${CANONICAL_HOST}/?lang=en`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'x-default'],
        ['href', `${CANONICAL_HOST}/`],
      ],
    ],
    meta: [
      [
        ['property', 'og:url'],
        ['content', `${CANONICAL_HOST}/`],
      ],
    ],
  },
  {
    path: '/?lang=en',
    expected: [
      '<html lang="en" dir="ltr"',
      'application/ld+json',
    ],
    links: [
      [
        ['rel', 'canonical'],
        ['href', `${CANONICAL_HOST}/?lang=en`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'he'],
        ['href', `${CANONICAL_HOST}/`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'en'],
        ['href', `${CANONICAL_HOST}/?lang=en`],
      ],
      [
        ['rel', 'alternate'],
        ['hrefLang', 'x-default'],
        ['href', `${CANONICAL_HOST}/`],
      ],
    ],
    meta: [
      [
        ['property', 'og:url'],
        ['content', `${CANONICAL_HOST}/?lang=en`],
      ],
    ],
  },
  {
    path: '/menu?lang=en',
    expected: [
      '"@type":"Menu"',
    ],
    links: [
      [
        ['rel', 'canonical'],
        ['href', `${CANONICAL_HOST}/menu?lang=en`],
      ],
    ],
  },
  {
    path: '/blog/injera-heart-of-meal?lang=en',
    expected: [
      '"@type":"BlogPosting"',
      '"datePublished":"2026-06-22"',
      '"dateModified":"',
      'Further reading',
    ],
    links: [
      [
        ['rel', 'canonical'],
        ['href', `${CANONICAL_HOST}/blog/injera-heart-of-meal?lang=en`],
      ],
    ],
  },
]

for (const check of checks) {
  const html = await get(check.path)

  for (const expected of check.expected) {
    assertIncludes(html, expected, check.path)
  }

  assertInHead(html, '<title>', check.path)
  assertInHead(html, '<meta name="description"', check.path)

  for (const link of check.links ?? []) {
    assertLinkTag(html, link, check.path)
  }

  for (const meta of check.meta ?? []) {
    assertMetaTag(html, meta, check.path)
  }
}

const home = await get('/')
if (home.includes('aggregateRating')) {
  throw new Error('/ must not publish a third-party aggregateRating')
}
if (!/"dateModified":"\d{4}-\d{2}-\d{2}"/.test(await get('/blog/injera-heart-of-meal'))) {
  throw new Error('/blog/injera-heart-of-meal dateModified must be YYYY-MM-DD')
}

const typoRedirect = await fetch(`${BASE_URL}/blog/ethiopian-dish-glossary`, {
  redirect: 'manual',
})
if (
  typoRedirect.status !== 308 ||
  !typoRedirect.headers.get('location')?.endsWith('/blog/ethiopian-dishes-glossary')
) {
  throw new Error('/blog/ethiopian-dish-glossary must 308 to /blog/ethiopian-dishes-glossary')
}

const sitemap = await get('/sitemap.xml')
for (const expected of [
  `<loc>${CANONICAL_HOST}/</loc>`,
  `hreflang="en" href="${CANONICAL_HOST}/?lang=en"`,
  `hreflang="x-default" href="${CANONICAL_HOST}/"`,
]) {
  assertIncludes(sitemap, expected, '/sitemap.xml')
}
const lastModifiedDates = new Set(
  [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]),
)
if (lastModifiedDates.size < 2) {
  throw new Error('/sitemap.xml lastmod values must be real content dates, not one build time')
}

const robots = await get('/robots.txt')
assertIncludes(robots, `Sitemap: ${CANONICAL_HOST}/sitemap.xml`, '/robots.txt')

const llms = await get('/llms.txt')
assertIncludes(llms, `${CANONICAL_HOST}/`, '/llms.txt')
if (llms.includes('balinjera.vercel.app')) {
  throw new Error('/llms.txt still references balinjera.vercel.app')
}

console.log('Rendered SEO check passed')
