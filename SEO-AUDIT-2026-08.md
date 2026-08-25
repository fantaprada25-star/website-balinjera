# Balinjera — SEO / GEO Audit II

**Site:** Balinjera — kosher Ethiopian restaurant, Kerem HaTeimanim / Carmel Market, Tel Aviv. Bilingual Hebrew (RTL, default) / English (LTR, `?lang=en`).
**Date:** 2026-08-25
**Method:** three specialized SEO subagents run in parallel (full technical crawl, competitor analysis, content strategy), plus direct live verification by the lead auditor: production HTML diffing via `curl`, PageSpeed Insights (lab + field/CrUX), Google indexation via `site:` search, a local production build (`next build`) to inspect static-vs-dynamic route behavior, and independent re-verification of every review/rating figure. Fixes were implemented and verified (typecheck, lint, live browser check in both languages) in the same session.
**Supersedes:** [`SEO-AUDIT-2026-07.md`](SEO-AUDIT-2026-07.md) (2026-07-19) — that audit's P0 backlog is implemented and verified still-correct here; not repeated below except where status changed.

---

## 1. Executive summary

The July audit's P0 fixes (schema geo/rating, canonical internal links, bilingual sitemap) are confirmed live and correct. This second pass went deeper — three specialized agents plus direct production verification found **two categories of issue the first pass didn't touch**: a real technical debt item from the site's pre-migration history (indexed legacy URLs now dead-ending), and a genuine Core Web Vitals regression with a precisely diagnosed but only partially fixable root cause.

**Eight fixes shipped and verified this session** (§4). **One significant finding was investigated, a fix attempted, found insufficient and unsafe, and correctly reverted** (§3) — documented honestly rather than either hidden or oversold as solved.

### The one finding that matters most: Core Web Vitals now fails on real traffic, and the full fix is a separate project

PageSpeed Insights, checked live against production for the first time since the site had enough real-user traffic to generate CrUX field data, shows:

- **Lab: Performance 71/100** (mobile) — below the 90 threshold this audit was asked to verify. SEO 100, Accessibility 100, Best Practices 100, Agentic Browsing 3/3 all still pass.
- **Field (real users, CrUX): Core Web Vitals assessment = FAIL**, driven by LCP at 2.9s (the "good" threshold is ≤2.5s). INP and CLS both pass.

Root cause, confirmed with a local production build: **the entire site is served with `Cache-Control: private, no-store` — zero CDN caching, on every single page.** This is because every page component reads `searchParams` to resolve `?lang=he/en`, and `searchParams` is a Next.js "Dynamic API" — any route that reads it is forced into per-request server rendering, with no edge cache. This has likely always been true; it only became visible now because the site finally has enough real traffic for Google's Chrome UX Report to generate field data for it.

I attempted the smallest safe-looking fix (remove the root layout's separate `headers()`-based dynamic dependency) and verified via `next build` that it **only affects the shared layout and the blog article pages** — the six main routes (`/`, `/about`, `/menu`, `/events`, `/accessibility`, `/blog`) each read `searchParams` independently in their own page code, so they stay dynamic regardless. The attempted layout-level fix also introduced a real hydration bug (stale `lang`/`dir` after client-side navigation between pages) in testing. **I reverted it rather than ship a partial, buggy fix under time pressure.** See §3 for the full technical brief — this is the top priority for a dedicated follow-up session with proper testing time, not something to rush.

### Other new findings this session

- **Legacy WooCommerce URLs are still indexed by Google and now 404** — fixed, now redirect to `/menu` (§4).
- **7 real competitors identified** (not 3) via the competitor-analysis agent — Balinjera is the *only kosher option with an actual website*, a durable structural advantage (§5).
- **A concrete, ranked 6-piece content roadmap** grounded in the site's real menu/blog data, not generic advice (§6).
- **FAQPage schema had zero matching visible content** — a real Google structured-data policy risk with no upside. Fixed with a small, discreet visible block, per your explicit choice this session (§4).
- Several smaller, low-risk fixes: duplicate `<h1>`, duplicate hero-image fetch, wrong `og:image` dimensions, an overlong meta description, a stale review count (§4).

---

## 2. What's confirmed still correct from the July audit

Re-verified live, not assumed: bilingual metadata, hreflang/canonical (including on blog article pages specifically), `robots.txt` bot allowlist (GPTBot/ClaudeBot/PerplexityBot/Google-Extended), sitemap (20/20 URLs, matches every crawled route, no orphans), JSON-LD validity across Restaurant/Menu/Blog/Breadcrumb/Service, `geo`/`aggregateRating` on the Restaurant schema, internal links pointing at canonical URLs, `suitableForDiet` on genuinely vegan items, `llms.txt`.

---

## 3. The caching / Core Web Vitals finding — full technical brief

### What's happening

```
curl -sI https://www.balinjera.com/        → cache-control: private, no-store ; x-vercel-cache: MISS
curl -sI https://www.balinjera.com/blog    → same
curl -sI https://www.balinjera.com/events?lang=en → same
```

Every page, every language, every request — confirmed on repeated fetches. For contrast, `sitemap.xml`/`robots.txt` (which don't read `searchParams`) return `cache-control: public` and `x-vercel-cache: HIT` (cached for days). Measured TTFB: ~520–750ms for pages vs ~330–370ms for the cached sitemap — that gap is a direct tax on LCP, since TTFB is a hard floor under it.

### Why

The site's `?lang=en` query-string i18n strategy (a deliberate choice, already flagged as a tradeoff in the June audit) requires every page to read `searchParams.lang` to know which language to render. Reading `searchParams` is one of Next.js's "Dynamic APIs" — using it anywhere in a route opts that route out of static rendering and CDN caching, by design, for every request.

### What I tried, and why I backed it out

The root layout separately called `headers()` to read an `x-lang` header set by middleware — a second, independent dynamic dependency, sitewide, at the very top of the render tree. Removing it and defaulting `<html>` to Hebrew/RTL with a tiny client-side correction script for the English case was the obvious "quick win." I implemented it and verified with a local production build (`next build`):

- ✅ `/_not-found` flipped from dynamic to fully static.
- ❌ The six main routes (`/`, `/about`, `/menu`, `/events`, `/accessibility`, `/blog`) **stayed dynamic** — each reads `searchParams` in its own `page.tsx`, independent of the layout.
- ❌ In manual testing, the client-side correction script only runs on a hard page load. Next.js's `<Link>` components navigate client-side without a full reload, so `lang`/`dir` could go stale after navigating between pages — confirmed live via a real React hydration-mismatch warning.

Given the actual caching payoff was narrow (layout tree + 4 blog articles only, not the six pages that matter most) and the risk was real (a bilingual RTL/LTR correctness bug, on a component with a documented history of exactly this kind of fragility — four separate "stabilize hero" commits before this session), I reverted the change rather than ship it.

### The real fix, and its tradeoffs (recommend as a separate, dedicated project)

1. **Lower-risk option:** apply the same "static default + client correction" pattern to *every* page, not just the layout — meaning every page statically renders Hebrew by default, and a client script corrects language-dependent content after hydration for the `?lang=en` case. Tradeoff: any crawler or bot that doesn't execute JavaScript (some AI crawlers, link-preview scrapers) would see Hebrew content on English URLs. Needs careful, page-by-page implementation and testing — this is not a one-line change multiplied by six, because each page's content (not just `lang`/`dir`) would need client-side correction.
2. **Higher-effort, architecturally correct option:** migrate to path-based locales (`/en/...`) so language is resolvable from the URL alone, enabling full static generation per locale. This is a genuine migration — every route, every internal link, the sitemap, and hreflang all need updating — but it's the fix that has no crawler-visibility tradeoff.

Either path deserves its own planning session with real end-to-end testing across both languages, not a rushed change inside a broader content/schema audit.

---

## 4. Fixes implemented and verified this session

| # | Fix | Files | Verification |
|---|---|---|---|
| 1 | Legacy `/shop` and `/shop/*` (indexed WooCommerce URLs from the pre-Next.js site) now 301-redirect to `/menu` instead of 404ing | `next.config.ts` | Live-tested redirect chain |
| 2 | Custom branded, bilingual-shell `not-found.tsx` — also fixes a duplicate `<title>` HTML-validity bug that existed on every broken URl | `src/app/not-found.tsx` (new) | Confirmed single `<title>`, branded nav/footer render |
| 3 | Homepage hero: two sibling `<h1>` elements merged into one (was a real heading-hierarchy defect, screen readers announced two top-level headings for one sentence) | `scroll-expansion-hero.tsx` | `document.querySelectorAll('h1').length === 1` confirmed live |
| 4 | Removed a duplicate high-priority image fetch — the hero's background and foreground layers both eagerly requested the *same* file (`hero.jpg`) as `priority`; now only the background does | `balinjera-home-content.tsx` | Code-verified; minor, safe LCP-adjacent cleanup |
| 5 | `FAQPage` schema now has exactly matching visible text on the page (was schema-only — zero DOM text outside the `<script>` tag, a real Google structured-data policy risk and useless to AI crawlers). Implemented as a small, discreet block, not a visual "FAQ section" — your explicit choice this session | `balinjera-content.ts` (`faqTitle`+`faq`), `balinjera-home-content.tsx`, `balinjera-home.module.css` | DOM text vs JSON-LD diffed programmatically — exact match confirmed |
| 6 | `og:image` dimensions corrected: declared 1280×720, actual measured file is 1152×970 — mismatch risked social-preview cropping on Facebook/LinkedIn/Twitter | `balinjera-seo.ts` | Independently re-measured the live file's JPEG header myself (not just trusted the sub-agent) |
| 7 | Trimmed one overlong meta description (189 chars → 148) on the English `kosher-ethiopian-food-carmel-market` blog post | `balinjera-content.ts` | Recounted |
| 8 | `aggregateRating.reviewCount` refreshed to 179 (from 178) and re-sourced with a clear citation — the earlier session's "1,506 Google reviews" figure could not be independently reconfirmed this session and is explicitly flagged as unverified rather than reused | `balinjera-schema.tsx` | Re-verified directly via live search of the TripAdvisor listing, cross-checked twice |

All 8 verified via `pnpm type-check`, `pnpm lint`, and live rendering in both languages. Committed to `dev` (`ad106f3`) and pushed — **not merged to `main`** this session, per your instruction to stop at `dev` for review.

---

## 5. Competitive landscape (new this session)

Full comparison table and sourcing in the agent's research; summary:

**7 real competitors** confirmed (not the 3 named in the July pass): Ethiopia Restaurant/Tewodros, Ge'ez, Lucy Ethiopian Restaurant, Almaz Mendel, Habash, Tenat, Hayloga. Tenat and Hayloga have uncertain/possibly-closed operational status.

**Balinjera's structural advantage: it is the only kosher Ethiopian restaurant in Tel Aviv with an actual website.** Of the 7 competitors, only Ge'ez has any real site (single-page, no blog); everyone else — including the two other kosher options, Almaz Mendel and Habash — is Instagram/Facebook/directory-only. Balinjera is also the only competitor publishing any content at all. This is a durable advantage that doesn't erode on its own, but it's also thin: any one competitor building a real site could erase it.

**Where Balinjera is behind:** Lucy Ethiopian Restaurant has 486 reviews on RestaurantGuru with *zero* website — pure word-of-mouth outperforming Balinjera's SEO investment on raw trust signal. Ge'ez has better on-page brand storytelling than most individual Balinjera pages, despite having no blog.

**Exploitable gaps, ranked:**
1. Own the Kerem HaTeimanim / Carmel Market long-tail outright — only one weak competitor (Ethiopia Restaurant, no website, 31 reviews) shares this exact geography.
2. Build out the blog while zero competitors are contesting it.
3. Claim "kosher Ethiopian restaurant Tel Aviv" — only 2 competitors are kosher, neither has a website.
4. Contest gluten-free — Habash markets this hard via word-of-mouth but has no site to capture the search demand it's creating.
5. Expand the catering page before Almaz Mendel (genuinely strong experiential offer: live music, art gallery) digitizes theirs.

---

## 6. Content roadmap (new this session)

Grounded in the actual codebase — every existing blog post, every menu item, every schema builder was checked before writing this, not generic advice. All 4 live posts share one format (narrative essay, 3 H2 sections); the roadmap deliberately breaks that pattern.

**Ranked, ready to write now** (no missing facts):
1. **Menu glossary** — "What is Doro Wat, Tibs, Shiro, Firfir?" List/glossary format (a first for the blog). Repurposes the 39-item menu's existing real descriptions into pre-visit content; ideal for AI-overview extraction.
2. **Vegan guide** — "Vegan Ethiopian food near Carmel Market." Pulls directly from menu items already tagged `suitableForDiet: VeganDiet` in the schema (§4 of the July audit). Kosher + vegan + Ethiopian is a genuinely narrow, low-competition angle.
3. **How-to** — "How to eat injera by hand." Numbered how-to format (the blog has zero how-to content currently); reduces first-timer anxiety, a real conversion barrier for unfamiliar communal dining.

**Ready, but needs one small edit first:** a quick win — the existing `kosher-ethiopian-food-carmel-market` post uses "אוכל אתיופי" (Ethiopian *food*) in its title/H1, while the query that actually converts at 29.4% CTR uses "מסעדה אתיופית" (Ethiopian *restaurant*). Retitling to match the exact converting phrase is a same-day edit, not a new post.

**Needs your input before writing** (flagged, not guessed):
4. **Gluten-free explainer** — real fact (injera is GF), but Dabo bread and the Nefro salad are wheat-based per the current menu, so wording must stay scoped to "the injera is GF," never a blanket restaurant claim.
5. **Coffee ceremony piece** — needs confirmation whether an actual ceremonial pour happens in-restaurant, or whether buna is just served by the cup — don't want to claim an experience that doesn't exist.
6. **Neighborhood guide** — fine as a concept, but any specific third-party business names or walking times need verifying, not estimating.

---

## 7. Updated priority list

| Priority | Item | Status |
|---|---|---|
| P0 | Caching/CWV architecture fix (§3) | **Documented, not fixed — deferred by owner to a dedicated session** |
| P0 | 8 fixes in §4 | ✅ Done, merged to `main` (`b96323e`) |
| P1 | Content pieces #1–3 (§6) — menu glossary, vegan guide, how-to-eat-injera | ✅ Written, HE+EN, live-verified |
| P1 | Retitle `kosher-ethiopian-food-carmel-market` to the converting query | ✅ Done — now "מסעדה אתיופית כשרה ליד שוק הכרמל" / "Kosher Ethiopian restaurant near Carmel Market" |
| P2 | Content pieces #4–6 (§6) | ✅ Written, HE+EN — **scoped to verified facts only**, see §8 for what was deliberately left out |
| P2 | Convert `background-image` CSS photos to `next/image` | ✅ Done for the 3 that actually render; see §8 for the measured savings and the one that turned out to be dead CSS |
| P3 | Real dish/venue photography for `/menu` and `/about` | Owner has no dish photos available yet — remains open |

---

## 8. Implementation round 2 — what shipped after the audit

### Content: 6 new posts (12 pages, HE + EN)

`ethiopian-dishes-glossary`, `vegan-ethiopian-carmel-market`, `how-to-eat-injera`, `injera-gluten-free`, `ethiopian-coffee-buna`, `kerem-hateimanim-guide`. Blog grew 4 → 10 posts; sitemap 20 → 32 URLs. All verified live: one `<h1>` each, 3 `<h2>` sections, `BlogPosting` schema, correct canonical + reciprocal hreflang, HE/EN slug parity confirmed programmatically.

**Deliberately scoped to verified facts.** The owner asked for all six, including the three this audit had flagged as needing fact confirmation. Rather than block, they were written strictly from what is already verifiable (the live menu, the existing site copy, and general culinary knowledge), with the unverifiable claims left out entirely:

| Post | What was deliberately **not** claimed | To expand it, owner needs to confirm |
|---|---|---|
| `injera-gluten-free` | No celiac-safety or cross-contamination claim. Scoped strictly to "teff injera is naturally gluten free", and explicitly names dabo and the nefro salad as wheat-based. Closes by telling sensitive diners to phone ahead. | Whether the kitchen manages cross-contact |
| `ethiopian-coffee-buna` | No ceremonial pour, no jebena roasting, no incense, no "three rounds". Describes only what the menu actually sells: buna by the cup and a buna pot for sharing. | Whether a real ceremony happens on-site |
| `kerem-hateimanim-guide` | No third-party business names, no walking times, no distances. Describes the neighborhood and Carmel Market (public landmarks) only. | Which nearby venues they're happy to name |

If those three facts get confirmed, each post can be deepened without restructuring.

### Images: 3 conversions, 1 finding retracted

The audit (via subagent) listed four `background-image` photos to convert. **One was wrong and is retracted:** `injera-wide.jpg` on blog articles never renders — `PageHero` is called there with `showImage={false}`, so the div is never emitted. Verified against production HTML: no `subHeroImage` element exists on blog article pages. The `.blogHeroImage` rule was dead CSS and was deleted rather than "converted". (The earlier grep that suggested otherwise was matching the inlined stylesheet, not a rendered element — a good reminder that a CSS reference is not proof of a network request.)

The three that do render were converted to `next/image`, with savings measured against a real production build rather than estimated:

| Image | Where | Original | WebP @1080 | Saving |
|---|---|---|---|---|
| `team.jpg` | `ReserveSection` — **every page** | 215 KB | 54 KB | **~75%** |
| `event-card.jpg` | `/events` hero | 154 KB | 88 KB | ~43% |
| `food-table.jpg` | `/accessibility` hero | 111 KB | 110 KB | ~1% (source is only 768px wide and high-entropy; converted for responsive srcset + format negotiation, not for byte savings) |

Note `team.jpg` is the one that matters — it loads on all 10+ routes.

### Environment fix (unrelated to the site, worth knowing)

`node_modules` and `.next` contained 9 files renamed by macOS with a `" 2"` suffix (e.g. `abs 2.js` replacing `abs.js`), which broke ESLint outright and caused the spurious "duplicate identifier" TypeScript errors seen at the start of this work. This is iCloud Drive syncing the project folder (`~/Documents`). A clean reinstall fixed it, **but it will recur.** Recommend either excluding this project from iCloud sync, or moving the repo outside `~/Documents`.

---

## 9. What wasn't re-verified this session

Google Search Console query-level data and Google Business Profile interaction data (both from the July session, ~6 weeks old now) were not re-pulled — those need the same login-gated dashboard access as before. The trend direction (branded-heavy, local long-tail converting best) is very unlikely to have reversed in 6 weeks, but the exact numbers are stale and worth refreshing before the next round of content investment.
