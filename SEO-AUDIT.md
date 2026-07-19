# Balinjera — SEO Audit

> ⚠️ **Superseded.** This audit is dated 2026-06-22 and its premise (site on `balinjera.vercel.app`, un-indexed) is obsolete — nearly its full P0/P1 backlog has since shipped. See [`SEO-AUDIT-2026-07.md`](SEO-AUDIT-2026-07.md) for the current audit, grounded in live Search Console data.

**Site:** Balinjera — bilingual (Hebrew-RTL default / English-LTR) restaurant, Tel Aviv (Ethiopian cuisine)
**Stack:** Next.js 15.5.18 · React 19 · App Router · SSR · deployed on Vercel (`https://balinjera.vercel.app`)
**Date:** 2026-06-22 · **Method:** source-code audit (the site is server-rendered, so the repo ≈ the served HTML). No paid tooling.
**Priority outcomes (owner):** Events & catering · Brand & blog reach.
**Owner constraints honored:** no FAQ section, no About imagery, no on-page blog images (and the dead `image` fields are removed). Almost every recommended fix is invisible on the page — visual items are tagged 👁 and are optional.

> Finding shape: **Issue / Impact / Evidence (`file:line`) / Fix / Priority**. Each backlog item is tagged **⬜ Invisible** (no on-page change) or **👁 Visual**.

---

## 1. Executive summary

Balinjera has a **clean technical foundation** (modern Next.js SSR, strict TypeScript, strong Hebrew/English content parity, real-text contact info) but is **missing almost the entire SEO surface layer**. There is no `robots.txt`, no structured data, no Open Graph, no per-page titles, and — most importantly for a bilingual site — **no hreflang and no canonical strategy** for the `?lang=he|en` query-parameter design. The live site currently returns **404 on `/robots.txt`** and is **not indexed** (`site:balinjera.vercel.app` returns nothing): organic presence today is effectively zero.

The single biggest structural risk is the **bilingual strategy**: Hebrew and English share the same URL (`/` vs `/?lang=en`) with no hreflang and no emitted canonical, so Google has no signal that the English version exists — it will consolidate everything into the Hebrew default and the English site stays invisible.

The good news: **every P0 fix is invisible** — they live in `<head>`, in new non-page files, or in `<script>` JSON-LD. The owner can capture 100% of the critical gains with zero change to the site's look.

### Scorecard

| Area | Grade | One-line |
|---|:---:|---|
| Crawlability & Indexation | 🔴 D | No `robots.txt` (404); not indexed; `?lang` params uncontrolled. |
| Technical SEO (metadata) | 🔴 D | One static, mixed-language title/description for the whole site; no per-page metadata. |
| Bilingual / Translation | 🔴 D− | No hreflang, no canonical, `<html lang>` hardcoded `he`; EN effectively unindexable. |
| On-Page | 🟠 C | No `<h1>` on the home page; otherwise solid headings, alt text, real-text NAP. |
| Structured Data / AI Visibility | 🔴 F | Zero JSON-LD; restaurant entity, hours, menu, articles all machine-invisible. |
| Internal Linking | 🟠 C | Good nav hub; blog articles near-orphaned, no breadcrumbs. |
| Broken Links | 🟢 A− | No broken internal links/anchors found; external liveness out of scope. |
| Content & Keywords | 🟠 C+ | Strong bilingual copy; no keyword targeting; events/catering under-served. |
| Measurement | 🔴 F | No analytics — no way to measure any outcome. |

### Top 5 priorities

1. **Bilingual signals** — add hreflang (`he` / `en` / `x-default`) + self-referencing canonical per language. Without this, English never ranks. *(P0-3)*
2. **Per-page metadata** — language-aware `generateMetadata()` so each page/post has a unique, single-language title + description. *(P0-2)*
3. **`robots.txt`** — emit one (currently 404) pointing to the sitemap, with a deliberate AI-bot policy. *(P0-1)*
4. **Structured data** — Restaurant + LocalBusiness (NAP/hours/geo/menu/socials), Article on posts, BreadcrumbList. Unlocks rich results, local pack, and AI-citation. *(P0-5)*
5. **Fix `<html lang>`/`dir`** — currently hardcoded `he` on every page including English. *(P0-4)*

---

## 2. Crawlability & Indexation

### 2.1 — No `robots.txt` 🔴 P0
- **Issue:** No `robots.txt` is served. Next.js does not generate one unless you add `app/robots.ts`, and none exists.
- **Impact:** No crawl directives and — critically — **no `Sitemap:` pointer**, so crawlers (and AI bots) have no map of the site. Combined with a `.vercel.app` domain and zero backlinks, discovery is slow to nonexistent.
- **Evidence:** No `src/app/robots.ts`; live `GET /robots.txt` → **404**.
- **Fix:** Add `src/app/robots.ts` allowing crawl, linking the sitemap, and stating an explicit AI-bot policy (allow/deny `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).

### 2.2 — Site not indexed 🟠 P1 (symptom)
- **Issue:** `site:balinjera.vercel.app` returns no results.
- **Impact:** No organic visibility today. Expected for a new deploy with no robots/sitemap submission and no backlinks, but it confirms there is no baseline to lose — fixes compound from zero.
- **Evidence:** Web search `site:balinjera.vercel.app` → 0 domain results.
- **Fix:** After P0 items ship, submit the sitemap in **Google Search Console** & **Bing Webmaster Tools**; consider a custom domain (a `.vercel.app` subdomain carries weaker trust signals).

### 2.3 — `?lang` parameter is uncontrolled 🔴 P0 (see §4)
- **Issue:** Language is a query parameter (`?lang=en`) with no canonical or hreflang to disambiguate it.
- **Impact:** Google may crawl `/`, `/?lang=he`, `/?lang=en` as duplicate/near-duplicate URLs and pick one arbitrarily; parameter URLs are frequently dropped. Detail in §4.
- **Evidence:** `hrefWithLang()` appends `?lang=` to internal links — `balinjera-content.ts:69`; no `alternates` anywhere in `src`.

### 2.4 — Sitemap exists but is thin 🟠 P1
- **Issue:** `sitemap.ts` lists all routes but has **no `lastModified`** and **no per-language (`alternates.languages`) entries**.
- **Impact:** Crawlers get no freshness signal and no hreflang map from the sitemap (a second, recommended place to declare language alternates).
- **Evidence:** `src/app/sitemap.ts:15-31` — only `url`, `changeFrequency`, `priority`.
- **Fix:** Add `lastModified`; add `alternates.languages` (he/en) per entry once the URL strategy in §4 is chosen.
- ✅ **Good:** the sitemap correctly enumerates all static routes **and** dynamic blog slugs via `getBlogPostSlugs()` (`sitemap.ts:24`).

---

## 3. Technical SEO (metadata & head)

### 3.1 — One static title/description for the entire site 🔴 P0
- **Issue:** Only the **root layout** defines metadata; **no route defines `generateMetadata()`**. So `/`, `/about`, `/menu`, `/events`, `/blog`, `/blog/[slug]`, `/accessibility` **all share the same `<title>` and `<meta description>`**.
- **Impact:** Every page competes with the same title/snippet; Google can't tell pages apart; CTR and relevance suffer across the whole site. This is one of the highest-leverage fixes.
- **Evidence:** `src/app/layout.tsx:8-16` (the only metadata); grep for `generateMetadata` across `src` → **none**.
- **Fix:** Add language-aware `generateMetadata()` to each route — unique, single-language `title` + `description` (pull from `balinjeraCopy[lang]`).

### 3.2 — Title is mixed-script / not language-aware 🟠 P1
- **Issue:** `title: "Balinjera | מסעדת באלינג׳רה"` mixes Latin + Hebrew and is shown identically to both audiences; the description mixes Hebrew and an English tail sentence.
- **Impact:** Diluted, cluttered SERP snippet in both languages; neither audience gets a clean, keyword-aligned title.
- **Evidence:** `src/app/layout.tsx:10-12`.
- **Fix:** Per-language titles, e.g. HE `מסעדת באלינג׳רה — מטבח אתיופי בתל אביב` / EN `Balinjera — Ethiopian Restaurant in Tel Aviv`. (Folded into P0-2.)

### 3.3 — No Open Graph / Twitter cards 🟠 P1
- **Issue:** No `openGraph` or `twitter` metadata and no `og:image`.
- **Impact:** Links shared on WhatsApp / Facebook / iMessage / Slack render as a bare URL or title with no image — poor for a restaurant whose appeal is visual, and for blog/events sharing. *(Invisible on the page itself.)*
- **Evidence:** grep `openGraph|twitter|og:image` across `src` → **none**.
- **Fix:** Add `openGraph` + `twitter` with a **single site-wide default image** (`/balinjera/hero.jpg`) and per-page `title`/`description`. No per-post images needed (per owner).

### 3.4 — No emitted canonical 🟠 P1
- **Issue:** `metadataBase` is set (good), but Next.js only emits a `<link rel="canonical">` when `alternates.canonical` is provided — it isn't. So **no canonical tag is output** on any page.
- **Impact:** With `?lang` variants and no canonical, Google self-selects a canonical, usually collapsing language/param variants. See §4.
- **Evidence:** `layout.tsx:9` sets `metadataBase`; no `alternates.canonical` anywhere.
- **Fix:** Emit a self-referencing canonical per page/language (with the chosen URL strategy from §4).
- ✅ **Good:** `metadataBase` is correctly set (`layout.tsx:9`), and `viewport` is defined (`layout.tsx:18-21`).

### 3.5 — Favicon only; no touch icon / manifest 🟡 P2
- **Issue:** Only `icon: /balinjera/favicon.png`. No `apple-touch-icon`, no web manifest.
- **Impact:** Weak "Add to Home Screen" / iOS bookmark presentation; minor trust/polish signal. *(Effectively invisible on-page.)*
- **Evidence:** `layout.tsx:13-15`; no `manifest` file in `public/`.
- **Fix:** Add `apple-touch-icon` + a minimal `manifest.webmanifest` (name, theme color, icons).

### 3.6 — ✅ Rendering mode is correct
- Pages are `async` server components reading `searchParams` (`page.tsx:8-14`); blog uses `generateStaticParams`. Language-specific content is in the **server HTML** (verified live: `?lang=en` serves English). This is the right foundation — the gaps above are all additive.

---

## 4. Bilingual / Content-Translation (the #1 structural issue)

### 4.1 — No hreflang / language alternates 🔴 P0
- **Issue:** Hebrew and English are the **same URL** distinguished only by `?lang=`. There is **no `hreflang`** and **no canonical** telling Google these are language alternates of one another.
- **Impact:** Google cannot associate `/?lang=en` with `/` (Hebrew) as a translation. Parameter-only variants are commonly **not indexed**; the English site is effectively **invisible in search**. For a site explicitly built for English-speaking visitors/tourists in Tel Aviv, this forfeits the entire EN audience.
- **Evidence:** grep `alternates|hreflang|languages` across `src` → **none**; `hrefWithLang()` only appends a param (`balinjera-content.ts:69`).
- **Fix:** Emit reciprocal `hreflang` (`he`, `en`, `x-default`) + a self-referencing canonical per language, via `alternates.languages` in `generateMetadata()` **and** in the sitemap. **Strongly recommend** moving to path-based locales (`/en/...`, default Hebrew at `/`) — query-param i18n is the weakest pattern for SEO; if kept, the canonical/hreflang must encode the param explicitly.

### 4.2 — `<html lang>` hardcoded; `dir`/`lang` only on `<main>` 🔴 P0
- **Issue:** `<html lang="he">` is hardcoded for **every** page including English; the real `lang`/`dir` are applied to `<main>` instead.
- **Impact:** Search engines and screen readers read the **document** language as Hebrew even on English pages — wrong language signal, and it undercuts the accessibility claims on `/accessibility`.
- **Evidence:** `src/app/layout.tsx:29` (`<html lang="he">`, no `dir`); `src/app/balinjera-shell.tsx:336-337` (`dir`/`lang` on `<main>`).
- **Fix:** Drive `<html lang>` + `dir` from the resolved language (root layout reading the lang, or render the document attributes per page). Verify RTL **and** LTR are unchanged visually (CLAUDE.md rule).

### 4.3 — ✅ Content parity is strong
- HE (`balinjeraCopy.he`, ~`balinjera-content.ts:78`) and EN (`~:499`) are key-for-key parallel objects across nav, hero, menu, about, events, blog (2 posts), accessibility. This is the hard part — it's already done well and makes the metadata/hreflang work straightforward.

### 4.4 — Dead `image` field on blog posts 🟠 P1 (cleanup)
- **Issue:** `BalinjeraBlogPost` declares `image: string` and every post sets it, but it is **never rendered** (`post.image` is not read anywhere in the shell).
- **Impact:** Dead data; misleading for future maintainers; no SEO value. (Per owner: no on-page blog images.)
- **Evidence:** type `balinjera-content.ts:18-24` (`image` at `:22`); values at `:419,:434,:841,:856`; `post.image` not referenced in `balinjera-shell.tsx` (article render `:991-1035` uses `post.title/excerpt/body` only).
- **Fix:** Remove the `image` field from both HE + EN posts **and** from the `BalinjeraBlogPost` type. (The image *files* remain used as CSS backgrounds — safe to remove the field.)

---

## 5. On-Page SEO

### 5.1 — Home page has no `<h1>` 🟠 P1
- **Issue:** The home hero title renders as `<h2>` (two `motion.h2` blocks for the split title), and the rest of the page starts at `<h2>`/`<h3>`. The most important page has **no `<h1>`**.
- **Impact:** Weakens the primary topical signal on the highest-value page.
- **Evidence:** hero title = `motion.h2` at `src/components/ui/scroll-expansion-hero.tsx:511` & `:518`; home sections use `<h2>` (`balinjera-shell.tsx:368`) and `<h3>` (`:396`); no `<h1>` in the home render path.
- **Fix:** Render the hero title as `<h1>` (keep the exact same CSS class/styling → **visually identical**). ⬜

### 5.2 — ✅ Headings elsewhere are correct
- Every non-home page renders exactly one `<h1>` via its hero (`balinjera-shell.tsx:556,587,641,685,720`), then logical `<h2>`/`<h3>`/`<h4>`.

### 5.3 — ✅ Images & alt text are handled well
- Logo `alt="Balinjera"`; decorative `figure.png` is `alt=""`; hero `<Image>` falls back to the title as alt (`scroll-expansion-hero.tsx:472`); the many background images are CSS with `aria-hidden`. **No important text is baked into images** — menu, prices, NAP are all real text.
- Note (corrected): `event-card.jpg`, `products-card.jpg`, `team.jpg`, `injera-wide.jpg`, `food-table.jpg` are **all in use** as CSS backgrounds (`balinjera.module.css:395,504,508,512,561,572,694,928,1155,1568,1609,1614`) — there are **no unused images**.

### 5.4 — ✅ NAP is real, consistent text (local SEO ready)
- Name, address, phone (`BALINJERA_PHONE_DISPLAY = 03-525-2527`, `tel:+97235252527` — `balinjera-content.ts:39-40`), email (`:41`), and opening hours are present as real text in the footer. This is exactly what LocalBusiness schema (§6) needs — it just isn't marked up yet.

---

## 6. Structured Data & AI Visibility (AEO / GEO)

### 6.1 — Zero structured data 🔴 P0
- **Issue:** No JSON-LD anywhere — no Restaurant, LocalBusiness, Menu, Article, or BreadcrumbList.
- **Impact:** Forfeits restaurant **rich results**, **local pack / knowledge panel** eligibility, and — increasingly important — **AI-citation**: ChatGPT/Perplexity/Google AI can't reliably extract the restaurant entity (cuisine, address, hours, menu, price range) from prose alone. For a brand-and-discovery goal, this is a major miss.
- **Evidence:** grep `ld+json|application/ld|schema.org` across `src` → **none**.
- **Fix (all ⬜ invisible `<script>`):**
  - **Home:** `Restaurant` + `LocalBusiness` — `name`, `address` (PostalAddress), `geo`, `telephone`, `email`, `openingHoursSpecification`, `servesCuisine: "Ethiopian"`, `priceRange`, `hasMenu` (→ `/menu`), `image` (`hero.jpg`), `sameAs` (Instagram/Facebook).
  - **`/blog/[slug]`:** `Article`/`BlogPosting` — headline, `inLanguage`, `datePublished`, `author`, `publisher`.
  - **Sitewide:** `BreadcrumbList`.
  - **`/menu`:** `Menu` with sections/items (the data already exists in `balinjeraCopy`).
  - *(FAQPage intentionally excluded — owner declined a visible FAQ, and FAQ schema must mirror visible content.)*

### 6.2 — AI crawlability undefined 🟡 P2
- **Issue:** With no `robots.txt`, AI crawlers are neither guided nor blocked, and there's no `llms.txt`.
- **Impact:** No control over (or invitation to) AI assistants that increasingly drive discovery.
- **Evidence:** no `robots.txt`; no `public/llms.txt`.
- **Fix:** Decide an AI-bot policy in `robots.ts` (§2.1) and add an `llms.txt` summarizing the restaurant (name, cuisine, location, hours, key pages). ⬜

### 6.3 — Entity signals are weak without schema
- The NAP, hours, cuisine, and menu all exist as text (§5.4) — once wrapped in schema, Balinjera becomes a well-defined entity for both search and AI. This is the single best lever for the **brand reach** goal.

---

## 7. Internal Linking & Architecture

### 7.1 — Blog articles are near-orphaned 🟡 P2
- **Issue:** A blog article links only **back to `/blog`** (plus the reserve CTA). There are **no related/prev-next links, no in-body contextual links** to `/menu` or `/events`, and no breadcrumbs.
- **Impact:** Link equity doesn't flow from content to money pages; articles are dead-ends; discovery and crawl depth suffer.
- **Evidence:** `balinjera-shell.tsx:1002-1009` (only back-link); article body is paragraphs only (`:1025-1027`); no related/breadcrumb markup.
- **Fix (👁 visual, optional):** add a related/prev-next block and a few **in-body contextual links** (e.g. the injera article → `/menu`; the "eat together" article → `/events` for group dining). Pairs naturally with BreadcrumbList schema.

### 7.2 — No breadcrumbs 🟡 P2
- **Issue:** No breadcrumb navigation anywhere.
- **Impact:** Misses a SERP breadcrumb enhancement and an internal-linking/orientation aid.
- **Fix:** Add `BreadcrumbList` JSON-LD (⬜ invisible) and optionally a visible trail (👁).

### 7.3 — ✅ Primary navigation is a healthy hub
- Header + footer link Home / About / Menu / Events / Blog, all via `hrefWithLang()` so the language is preserved across navigation (`balinjera-shell.tsx`). Order/Wolt is an external CTA. The main hub-and-spoke structure is sound; the gap is purely at the blog/content layer.

---

## 8. Broken Links

*Source-based static check (external liveness is out of scope per the source-only method — see §10).*

### 8.1 — ✅ No broken internal links or anchors
- All internal hrefs map to real routes: `/`, `/about`, `/menu`, `/events`, `/blog`, `/blog/[slug]`, `/accessibility` (match the `src/app` tree).
- All jump-anchors resolve to real `id`s: `#about` (`:365`), `#menu` (`:377`), `#footer` (`:236`), `#accessibility-statement` (`:802`), `#menu-sections` (`:936`) in the shell, and `#event-inquiry` in `events/event-inquiry-form.tsx:23` (linked from `EVENTS_CONTACT_HREF`, `balinjera-shell.tsx:47`).

### 8.2 — External links to verify (manual / live tool) 🟡 P2
- ✅ All external links use `target="_blank"` + `rel="noreferrer"`.
- Liveness can't be checked under the source-only method. Verify these manually (or with a link checker), most-likely-stale first:
  - `https://www.isoc.org.il/files/w3c-wai/guidelines.html` (accessibility page — old gov/ISOC link, **most likely to 404**).
  - Wolt order URL, Instagram, Facebook, WhatsApp (`wa.me`/`api.whatsapp.com` to `972…`), Google Maps query, `sitekept.com`.
- **Tip:** consider `rel="noopener"` (security) in addition to/instead of `noreferrer` if you want referral analytics on outbound clicks.

---

## 9. Keyword Clustering

No page currently targets specific queries (generic, mixed title; no per-page metadata). Proposed clusters, mapped to pages and prioritized for the owner's goals (**events/catering** + **brand/blog**):

| Cluster | Priority | Hebrew (primary) | English | Target page |
|---|:---:|---|---|---|
| **Brand** | ⭐ High | `באלינג'רה`, `מסעדת באלינג'רה` | `Balinjera`, `Balinjera Tel Aviv` | Home |
| **Events & catering** | ⭐ High | `קייטרינג אתיופי`, `אירועים פרטיים תל אביב`, `אירוח קבוצות במסעדה` | `Ethiopian catering Tel Aviv`, `private events`, `group dining Tel Aviv` | `/events` |
| **Category / local** | Med | `מסעדה אתיופית תל אביב`, `אוכל אתיופי`, `אינג'רה`, `כרם התימנים`, `שוק הכרמל` | `Ethiopian restaurant Tel Aviv`, `injera`, `Carmel Market` | Home + `/menu` |
| **Info / blog** | Med | `מה זה אינג'רה`, `איך אוכלים אינג'רה`, `אוכל אתיופי מסורתי` | `what is injera`, `how to eat injera`, `traditional Ethiopian cuisine` | `/blog` |

**Content gaps for the priority goals:**
- **Events/catering is under-served:** `/events` is essentially an inquiry form. The catering cluster has commercial intent and little competition in Tel Aviv — a dedicated, indexable **catering/private-events content section** (capacity, set menus, area served, lead time) would target it directly. *(👁 visual, optional — P2-5.)*
- **Brand & blog:** the 2 existing posts already map to the info cluster; the blog answers "what is injera / how to eat it" directly (no FAQ needed). Strengthen with schema (§6) and internal links (§7) rather than new pages.

---

## 10. Measurement & Out-of-Scope

### 10.1 — No analytics 🟡 P2
- **Issue:** No GA4 / GTM / Plausible / Vercel Analytics installed.
- **Impact:** No way to measure traffic, rankings movement, or conversions (orders/inquiries) — you can't manage what you can't see.
- **Evidence:** grep `gtag|analytics|plausible|@vercel/analytics` across `src` + `package.json` → **none**.
- **Fix:** Add analytics. **Cookieless Plausible (or Vercel Web Analytics)** stays fully invisible (no consent banner); GA4 typically needs a consent banner (👁 visible) to be compliant. ⬜ (Plausible) / 👁 (GA4 + banner).

### 10.2 — Out of scope for this source-only audit (use the right tool)
- **Real Google rankings / impressions / click data** → Google Search Console (submit sitemap there first).
- **Core Web Vitals field data** (LCP/INP/CLS) → PageSpeed Insights / CrUX. *(The codebase looks performance-friendly — local images, SSR — but field data needs a live tool.)*
- **External-link liveness** (§8.2) → a live link checker.
- **Backlink profile / authority** → Ahrefs / Semrush.

---

## 11. Prioritized fix backlog (pick-list)

Tell me which IDs to implement. Every change is applied to **both HE + EN** and verified in `?lang=he` **and** `?lang=en` per `CLAUDE.md`, then `pnpm type-check` + `pnpm lint`.
Legend: **⬜ Invisible** (no on-page change) · **👁 Visual** (additive, optional) · Effort S/M/L.

### P0 — Critical (all ⬜ invisible)

| ID | Fix | Visual | Effort |
|---|---|:---:|:---:|
| **P0-1** | `robots.ts` → allow crawl, link sitemap, set AI-bot policy | ⬜ | S |
| **P0-2** | Per-route `generateMetadata()` — unique, language-aware title + description for every page/post | ⬜ | M |
| **P0-3** | hreflang (`he`/`en`/`x-default`) + self-canonical per language (decide path-locale vs keep `?lang`) | ⬜ | M–L |
| **P0-4** | Drive `<html lang>` + `dir` from the resolved language (stop hardcoding `he`) | ⬜ | S |
| **P0-5** | JSON-LD: Restaurant + LocalBusiness (home), Article (posts), BreadcrumbList (site), Menu (`/menu`) | ⬜ | M |

### P1 — High

| ID | Fix | Visual | Effort |
|---|---|:---:|:---:|
| **P1-1** | Open Graph + Twitter cards; `og:image` = site-wide `hero.jpg`; per-page og title/description | ⬜ | S |
| **P1-2** | Home `<h1>`: render hero title as `<h1>` keeping identical styling | ⬜ | S |
| **P1-3** | Remove dead blog `image` field (HE + EN + `BalinjeraBlogPost` type) | ⬜ | S |
| **P1-4** | Sitemap: add `lastModified` + `alternates.languages` per entry | ⬜ | S |
| **P1-5** | `apple-touch-icon` + `manifest.webmanifest` | ⬜ | S |

### P2 — Medium / opportunities

| ID | Fix | Visual | Effort |
|---|---|:---:|:---:|
| **P2-1** | Analytics — Plausible/Vercel (cookieless, invisible) or GA4 (+ consent banner) | ⬜ / 👁 | S |
| **P2-2** | Blog internal linking — related/prev-next + in-body contextual links (article → menu/events) | 👁 | M |
| **P2-3** | Breadcrumbs — `BreadcrumbList` schema (⬜) and/or a visible trail (👁) | ⬜ / 👁 | S–M |
| **P2-4** | `llms.txt` for AI crawlers | ⬜ | S |
| **P2-5** | Events/catering content section targeting the catering cluster | 👁 | M |

### Excluded per owner
- ❌ Visible **FAQ** block **and** FAQPage schema.
- ❌ **About** imagery.
- ❌ On-page **blog images** (and their `image` fields are removed — P1-3).

---

## Appendix — what's already solid (don't touch)

- Modern **Next.js 15 SSR** + strict TypeScript; language content is in the server HTML.
- **`metadataBase`** correctly set; **sitemap** present and includes blog slugs; **viewport** defined.
- **Strong HE/EN content parity** (parallel `balinjeraCopy` objects).
- **Real-text NAP** (name/address/phone/email/hours) — schema-ready.
- **No broken internal links/anchors**; external links carry `rel` + `target`.
- **Good image hygiene** — meaningful alt text, decorative images `aria-hidden`/`alt=""`, no text baked into images, no unused assets.
- Dedicated **/accessibility** statement.
