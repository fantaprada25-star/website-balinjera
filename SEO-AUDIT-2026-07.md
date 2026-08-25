# Balinjera — SEO / GEO Audit

> ⚠️ **Superseded.** See [`SEO-AUDIT-2026-08.md`](SEO-AUDIT-2026-08.md) for the current audit — a multi-agent technical/competitor/content pass with live-verified fixes, including a critical caching/rendering finding not covered here.

**Site:** Balinjera — kosher Ethiopian restaurant, Kerem HaTeimanim / Carmel Market, Tel Aviv. Bilingual Hebrew (RTL, default) / English (LTR, `?lang=en`).
**Date:** 2026-07-19
**Method:** production HTML verified live via `curl` (not just source reading), Google Search Console (live account, ~2026-06-27 → 2026-07-18), Google Business Profile Performance (live account, Feb–Jul 2026), PageSpeed Insights, and external web research (reviews, press, competitors). Every technical claim below is traceable to one of those sources. The P0 code fixes identified in this audit were implemented and verified live in the same session (§7).
**Supersedes:** `SEO-AUDIT.md` (2026-06-22) — that audit's premise (site on `balinjera.vercel.app`, un-indexed, 🔴 D/F across the board) is obsolete. Nearly its entire P0/P1 backlog has shipped. This audit does not repeat resolved findings; where relevant it explicitly retracts them.
**Owner constraints carried forward from the prior audit** (still honored below): no FAQ *section* on the page, no About-page imagery, no on-page blog images.

---

## 1. Executive summary

The technical and content foundation shipped since the last audit is genuinely solid: bilingual metadata, hreflang, canonicals, JSON-LD for Restaurant/Menu/Blog/Breadcrumb, a clean `robots.txt` that explicitly welcomes AI crawlers, and a PageSpeed score of SEO 100 / Best Practices 100 / Accessibility 100 / Performance 95. **This is not a technical-SEO problem anymore.**

What Search Console data shows is a **demand-capture problem**: in the ~3 weeks since the property was verified, the site earned 348 clicks from 7.46K impressions (4.7% CTR, avg. position 7.6) — and roughly 90% of that is people already typing "Balinjera" by name. The clearest single number in this audit is the query `מסעדה אתיופית` ("Ethiopian restaurant"): **431 impressions, 4 clicks, 0.9% CTR** — the site is being shown for the category term and almost nobody clicks it, meaning it's ranking on page 2–3. Meanwhile `מסעדה אתיופית שוק הכרמל` ("Ethiopian restaurant Carmel Market") converts at **29.4% CTR** — the best in the account. That contrast is the strategic finding of this audit: **don't chase the generic head term, own the location- and dish-modified long tail where you already win.**

Two under-used assets showed up in external research, not the codebase: the restaurant has **177 TripAdvisor reviews (4.7★)** and a **Jerusalem Post feature**, and founder **Fanta Prada**'s story (former lawyer, health-driven pivot to her mother's Ethiopian recipes) is one of the more distinctive founder narratives available for a Tel Aviv restaurant, and it barely appears on the site itself.

**The single biggest number in this audit came from Google Business Profile, not the website:** 2,640 direction requests and 1,142 phone calls in the last six months (§6) — meaning the majority of real-world demand for this restaurant never touches balinjera.com at all. Organic search (348 clicks) is a young, growing channel; GBP is already the dominant one. The website's job going forward is to reinforce what GBP is already proving, not to try to replace it.

### Status and next 3 actions

**Done in this session (§7 — P0, all five items):** Restaurant schema now carries `geo` coordinates, postal code, and `aggregateRating` (4.7★/178 reviews); internal navigation links to the canonical Hebrew URL instead of `?lang=he`; the sitemap lists both languages as separate indexable URLs; the schema is language-aware end-to-end. Verified live (typecheck, lint, rendered HTML in both languages).

**Next 3, ranked by impact/effort:**

1. **Write a real "Our Story" section featuring Fanta Prada**, in both languages, linked from the homepage. Content-only, no new imagery needed. → §4.2, §6.
2. **Deepen the two blog posts** with subheadings, and add 1–2 new posts targeting the long-tail terms that already convert (kosher Ethiopian food Tel Aviv, catering, etc.) → §4.3, §5.
3. **Add capacity/pricing/lead-time facts to the events page** and a `Service`/`Offer` schema for catering — the owner's named priority area and currently the thinnest commercial page on the site. → §4.4.

### Scorecard

| Area | Grade | One-line |
|---|:---:|---|
| Crawlability & indexation | 🟢 A | robots.txt, sitemap (now bilingual, §7), hreflang, canonical all correct and verified live. |
| Technical metadata | 🟢 A− | Per-page bilingual titles/descriptions; root layout metadata still generic (minor, P2-3). |
| Bilingual implementation | 🟢 A− | Works correctly end-to-end; internal links now point at canonical URLs (fixed §7). |
| Structured data | 🟢 B+ | Restaurant/Menu/Blog/Breadcrumb present and valid; `geo`/`aggregateRating` added (§7); still missing kosher/diet facts. |
| Content depth | 🟡 C+ | Menu content is excellent; blog and events content are thin relative to commercial intent. |
| Local SEO & off-site signals | 🟢 A− | GBP confirmed as the dominant real-world channel (§6); on-site schema now reflects the review rating; press/kosher-cert detail still unclaimed. |
| Search performance | 🟡 C+ | Healthy for a 3-week-old GSC property; almost entirely branded, generic terms rank but don't convert. GBP demand is far larger and already mature. |
| GEO / AI-answer readiness | 🟡 B | `llms.txt` is genuinely good; menu is machine-extractable; `geo`/rating now present (§7); still missing kosher-certification and founder-story facts. |

---

## 2. What the data says

### 2.1 Search Console — Performance (verified live, 2026-06-27 → 2026-07-18)

**Note on the data window:** the property has only ~3 weeks of history — the "last 3 months" filter returns the same data as "since verification." Treat these as an early baseline, not a mature trend. The trend line across that window is flat-to-rising, not declining.

**Totals:** 348 clicks · 7.46K impressions · 4.7% CTR · average position 7.6.

**Top 10 queries:**

| Query | Impr. | Clicks | CTR |
|---|---|---|---|
| באלינג׳רה | 437 | 65 | 14.9% |
| balinjera | 195 | 17 | 8.7% |
| באלינגרה | 121 | 13 | 10.7% |
| באלינג׳רה תפריט | 41 | 10 | 24.4% |
| התפריט של באלינג׳רה | 59 | 7 | 11.9% |
| בא לי אינג׳רה | 32 | 7 | 21.9% |
| מסעדת באלינג׳רה | 25 | 5 | 20.0% |
| **מסעדה אתיופית שוק הכרמל** | 17 | 5 | **29.4%** |
| **מסעדה אתיופית** | **431** | **4** | **0.9%** |
| balinjera menu | 34 | 4 | 11.8% |

**Reading it:**
- Of the top 10 rows, 7 are branded queries (some form of "Balinjera"). Branded search is a healthy sign — it means word-of-mouth and offline exposure (Wolt, reviews, press) are working — but it is not acquisition; these people already knew to look for you.
- The one unbranded head term that shows real volume, `מסעדה אתיופית`, converts at under 1%. At position-7-ish (roughly matching the account average), that page 2/3 ranking is consistent with almost no clicks even at 431 impressions — this is a ranking problem, not a snippet problem.
- The one query that pairs a category term with a neighborhood modifier, `מסעדה אתיופית שוק הכרמל`, has the best CTR of anything in the account. That is direct evidence that hyper-local, modified long-tail queries are where this site is actually competitive right now.

**Breadcrumbs enhancement report:** 3 valid, 0 invalid (confirms the `BreadcrumbList` JSON-LD from §3.2 is being parsed correctly by Google).

**Not captured in this session** (state honestly rather than guess): the GSC **Pages** report (page-level HE/EN split), **Indexing → Pages** (whether `?lang=en` URLs are indexed or folded as duplicates), and GA4 (engagement, conversions, whether Wolt-order/phone-tap/event-form clicks are tracked at all). See §8.

### 2.2 PageSpeed Insights (mobile, verified live)

SEO **100** · Best Practices **100** · Accessibility **100** · Performance **95** · Agentic Browsing **3/3**. No CrUX field data is available yet — there isn't enough real-user traffic volume for Google to have a field dataset, which is itself consistent with the low-impression numbers above, not a measurement error.

### 2.3 Off-site signals (web research, not in GSC/GA4)

- **177 reviews on TripAdvisor**, strongly positive — praise for portion size, authenticity, and the shared-platter format.
- Featured in **The Jerusalem Post** (`jpost.com/food-recipes/article-723818`) and listed on Wanderlog, Asif, Secret Tel Aviv, Delicious Israel, taamtaam, easy.co.il.
- Kosher certification: **Rabanut Tel Aviv, Regila standard**, operating **Bassari** (meat, no dairy on premises) — a specific, checkable fact that appears nowhere in the site's structured data.
- Direct competitive set for the head term "Ethiopian restaurant Tel Aviv": **Tenat**, **Ethiopia Restaurant** (Allenby), **Almaz Mendel** (Florentin).

Of this, the review rating/count is now reflected in the site's JSON-LD (`aggregateRating`, implemented this session — §7). The press mention and the specific kosher-certification detail (Rabanut Tel Aviv, Regila, Bassari) are still absent from both the schema and the copy — still the largest remaining gap between "what's true about this restaurant" and "what a crawler or AI answer engine can currently learn from balinjera.com" (see P1 backlog, §7).

---

## 3. Technical SEO

### 3.1 What's working — verified live, not just in source

Confirmed by direct `curl` against `www.balinjera.com` in this session (not just reading the repo):

- `<html lang="he" dir="rtl">` on `/`, `<html lang="en" dir="ltr">` on `/?lang=en` — the middleware's `x-lang` header **does** work correctly. *(A prior static read of this codebase concluded the middleware was broken because it sets a response header instead of a request header; that conclusion does not match production behavior and should be discarded — likely `NextResponse.next()` forwarding response headers back into the request context works differently than assumed, or a caching layer normalizes it. Either way, the live site is correct.)*
- Canonical and hreflang are present and correctly reciprocal on every page checked (`/`, `/?lang=en`, `/menu?lang=en`): self-referencing canonical per language, `he`/`en`/`x-default` alternate links. These render as camelCase `hrefLang` attributes (React's JSX convention) — HTML attribute matching is case-insensitive, so this is valid and not a bug.
- `robots.txt` is live, returns 200, explicitly allows GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, and Google-Extended, and declares the sitemap.
- `sitemap.xml` is live and includes `xhtml:link` hreflang alternates on every URL.
- JSON-LD renders correctly: `Restaurant`+`LocalBusiness` on the homepage, `Menu`/`MenuSection`/`MenuItem`/`Offer` on `/menu`, `BlogPosting`+`BreadcrumbList` on articles, `BreadcrumbList` on interior pages — all confirmed present in the raw HTML response, and Search Console's Breadcrumbs report shows 0 errors.
- GA4 (`G-8FFS8Y1PH2`) and Vercel Analytics are both installed; GSC ownership is verified.
- `llms.txt` is well-built: business summary, hours/phone/email, key pages, an explicit note on the `?lang=en` convention, and links to both blog articles.
- HE/EN copy in `balinjera-content.ts` is genuinely key-for-key in sync (318 leaf paths each side, no orphaned keys either direction) — the repo's "both languages must match" rule is being followed correctly.
- All outbound links checked (Instagram, Facebook, Wolt, and the accessibility page's ISOC guidelines link) return HTTP 200. The prior audit flagged the ISOC link as the one most likely to be dead; it is not.

### 3.2 Confirmed gaps

Items 1, 2, 3, 4, 5, and 6 were fixed and verified live in this session — see §7 for what changed. Left here so the audit trail of what was found and why is preserved.

| # | Gap | File / evidence | Status |
|---|---|---|---|
| 1 | No `geo` (`GeoCoordinates`), no `postalCode` in the Restaurant schema. | [`balinjera-schema.tsx`](src/app/balinjera-schema.tsx) | ✅ Fixed |
| 2 | No `Review`/`aggregateRating` anywhere, despite 177 TripAdvisor reviews and an on-page testimonial. | [`balinjera-schema.tsx`](src/app/balinjera-schema.tsx), testimonial at [`balinjera-content.ts:213`](src/app/balinjera-content.ts#L213) (he) / [`:674`](src/app/balinjera-content.ts#L674) (en) | ✅ Fixed |
| 3 | Every internal link is built via `hrefWithLang`, which appends `?lang=he` for Hebrew — but the canonical Hebrew URL has *no* query string. Every internal link in the site therefore pointed at a non-canonical URL. | [`balinjera-content.ts:80`](src/app/balinjera-content.ts#L80); used at [`balinjera-shell.tsx:58,116,159,172,193,204,220,296`](src/app/balinjera-shell.tsx#L58) | ✅ Fixed |
| 4 | Sitemap listed only Hebrew URLs as `<loc>`; English URLs appeared solely inside `xhtml:link` alternates, never as their own indexable entry. | [`sitemap.ts`](src/app/sitemap.ts) | ✅ Fixed |
| 5 | `buildRestaurantSchema()` took no `lang` argument — rendered identically (English-only description) on both the Hebrew and English homepage, and `hasMenu` was hardcoded to the Hebrew menu URL even when the page was English. | [`balinjera-schema.tsx`](src/app/balinjera-schema.tsx), `page.tsx` | ✅ Fixed |
| 6 | `priceRange: "₪₪"` was non-standard; the draft-beer price `"28/23 ₪"` failed the offer-price regex, so that `MenuItem` silently shipped with no `offers`. | [`balinjera-schema.tsx`](src/app/balinjera-schema.tsx) | ✅ Fixed |
| 7 | Root layout metadata (`<title>`/`<description>`) is a static mixed Hebrew/English string, only overridden by pages that call `generateMetadata` — currently all of them do, so impact is limited, but any future route without one inherits the mixed-script fallback. | [`layout.tsx:17-19`](src/app/layout.tsx#L17-L19) | Open (P2-3) |
| 8 | `/accessibility` is fully indexable with no `robots` metadata anywhere on the site to exclude it. Low priority — it's legitimate content — but worth a deliberate decision rather than a default. | [`sitemap.ts`](src/app/sitemap.ts) | Open (P2-2) |

None of these require design or visual changes — every fix lives in schema/copy/routing files, consistent with the "invisible fixes only" preference the owner set in the prior audit.

---

## 4. Content audit

### 4.1 Menu — the site's strongest content asset

39 items across 7 sections, 19 with real ingredient-level descriptions (e.g. *"Doro wat — chicken stew with egg, onion, garlic and spicy seasoning, served with 3 vegetarian sides — 55 ₪"*), fully mirrored into `Menu`/`MenuSection`/`MenuItem`/`Offer` JSON-LD. This is genuinely strong, machine-extractable, and priced — exactly the kind of content AI answer engines can lift directly to answer "what should I order at an Ethiopian restaurant in Tel Aviv." Its only weaknesses are the schema-parsing gap on the dual-priced beer (§3.2 #6) and the absence of any `suitableForDiet` markup on the vegan items, which are called out in prose but not machine-tagged.

### 4.2 Homepage / About — matches actual search queries reasonably well

Hero and intro copy correctly emphasize "kosher Ethiopian," "Kerem HaTeimanim," "fresh injera," and "shared eating" — all of which line up with what people are actually searching (`מסעדה אתיופית`, `בא לי אינג׳רה`). The `featureSeo` block on the homepage exists specifically to carry these keyword phrases in both languages, which is good practice already applied.

**What's missing:** the founder story. Fanta Prada — the actual person behind the restaurant — is named only inside the testimonial's `cite` field on the current site (a customer's name, not the founder's), and her real story (former lawyer, Operation Moses immigrant, health-driven pivot to her mother's recipes) doesn't appear on balinjera.com at all despite being documented by third parties. This is a missed opportunity on two fronts: it's genuinely distinctive editorial content the site doesn't currently have, and it's exactly the kind of first-person, verifiable narrative that both Google's E-E-A-T guidance and AI answer engines weight heavily for "who is behind this business" queries.

### 4.3 Blog — real but thin

Two posts (`injera-heart-of-meal`, `eat-together-balinjera`), ~250–300 words each in both languages, genuinely topic-specific prose (not filler) but structured as a flat run of `<p>` tags with no subheadings, lists, or internal contextual links to `/menu` or `/events`. For a competitive informational query this is roughly a third of the depth of what typically ranks, and — for GEO specifically — flat prose with no `<h2>` structure gives an AI answer engine nothing to extract as a standalone chunk. Given the owner's stated priority of "brand & blog reach" (per the prior audit), this is the content area with the most headroom relative to stated goals.

### 4.4 Events — thin relative to commercial intent

The page has real, bilingual "why host with us" copy (`eventSeo`) and a working inquiry form, but no capacity numbers, no starting price point, no lead-time guidance, and no `Service`/`Offer` schema — all of which are the details a group organizer actually needs before filling out a form. Given "events & catering" is a named owner priority, this page currently converts intent-to-inquire copy into commitment less effectively than it could.

---

## 5. GEO / AI-search readiness

What's already working: `llms.txt` is well above average for a small business site — it states hours, phone, email, and explicitly documents the `?lang=en` convention so an AI crawler doesn't have to reverse-engineer it. The menu's JSON-LD is complete enough that an AI engine could answer "what's a good vegan dish at Balinjera" directly from structured data. `robots.txt` explicitly welcomes the major AI crawlers.

What's missing, in order of leverage:

1. **Entity facts that don't exist anywhere on-site:** kosher certification detail (Rabanut Tel Aviv, Regila, Bassari), review volume/rating, geographic coordinates. An AI answer engine synthesizing "kosher Ethiopian restaurants in Tel Aviv" currently has to go to third-party sources for facts the restaurant itself could state authoritatively.
2. **The founder narrative** (§4.2) — distinctive, verifiable, currently absent.
3. **FAQPage schema** — worth a narrower recommendation than the prior audit's blanket suggestion. The owner explicitly declined a visible FAQ *section* last time, and that's a reasonable call: Google restricted FAQ rich-result eligibility in 2023 to mostly government/health sites, so the rich-snippet upside is now marginal anyway. What still has value without adding a visual FAQ block is a small number of Q&A pairs embedded as `FAQPage` JSON-LD only (no on-page UI change) — e.g. "Is Balinjera kosher?", "Is the food gluten-free?", "Do you offer vegan options?" — answering exactly the disambiguating questions an AI assistant is likely to be asked. This respects the owner's visual constraint while still giving AI engines structured answers.
4. **Blog depth** (§4.3) — same content gap, same fix, doubles as an AI-extractability improvement.

---

## 6. Local SEO

This is the single biggest channel for this business, confirmed with real numbers, not inferred. Google Business Profile performance, Feb–Jul 2026 (~6 months, verified live in the owner's account):

| Metric | Total | Monthly avg |
|---|---|---|
| Profile interactions (all types) | 6,334 | ~1,055 |
| Direction requests | 2,640 | ~440 |
| Phone calls placed from the profile | 1,142 | ~190 |
| Website clicks from the profile | 1,532 | ~255 |

*(A note on reading this: the GBP dashboard's top-line "6,334" figure and the itemized "1,532 website clicks" figure are easy to conflate — they are not the same metric. 6,334 is total interactions across all types; only 1,532 of those are website clicks specifically. The three itemized metrics above sum to 5,314, leaving ~1,020 interactions of other unbroken-out types, most likely profile/photo/menu views.)*

**Reading it:** 2,640 direction requests and 1,142 phone calls in six months means the majority of people who find Balinjera through Google never touch the website at all — they navigate straight there or call. That's a far larger, more mature demand channel than organic search currently is (348 clicks in GSC's 3-week history, see §2.1). It also explains why PageSpeed shows no CrUX field data (§2.2): a large share of real-world demand simply doesn't route through balinjera.com.

This reframes the priority set in this audit rather than adding a new one: it's not "check whether GBP exists," it's "GBP is already the dominant, high-intent channel — the website's job is to reinforce what GBP is already proving true." That is exactly what P0-1/P0-2 (`aggregateRating` and `geo` on the Restaurant schema, now implemented — see §7) do: they let the website's own structured data corroborate the same trust signals (4.7★, real coordinates) that GBP is already converting on at scale.

**Still not verified in this session:** whether the Google Business Profile's NAP (name/address/phone) is byte-for-byte consistent with the site, whether it's linked to a booking flow, and how the review-response rate looks — worth a follow-up pass.

**Competitive context:** the three restaurants most likely to be evaluated alongside Balinjera for the head term are Tenat, Ethiopia Restaurant (Allenby), and Almaz Mendel (Florentin) — worth a follow-up look at what their GBP interaction volumes and review counts look like, to calibrate how much headroom exists on `מסעדה אתיופית`.

---

## 7. Prioritized backlog

Every item names the exact file and — where copy is involved — both `balinjeraCopy.he` and `balinjeraCopy.en`, per this repo's rule that a change isn't done until it's correct in both languages.

### P0 — done. Implemented and verified 2026-07-19 (typecheck, lint, live HE+EN render all pass)

| # | Fix | File(s) | Why |
|---|---|---|---|
| ✅ P0-1 | Added `geo: { "@type": "GeoCoordinates", latitude: 32.0698574, longitude: 34.7665593 }` and `postalCode: "6560475"` to `buildRestaurantSchema()`. Coordinates/postcode confirmed by reverse-geocoding the actual street address, not estimated. | `balinjera-schema.tsx` | §3.2 #1, §6 |
| ✅ P0-2 | Added `aggregateRating` (`ratingValue: "4.7"`, `reviewCount: "178"`) sourced from TripAdvisor's listing page, with an in-code comment noting the source and that it should be re-verified periodically as counts drift. | `balinjera-schema.tsx` | §3.2 #2, §6 — biggest single leverage item in this audit |
| ✅ P0-3 | `hrefWithLang` now omits the query string for Hebrew, matching the canonical URL. Verified live: homepage internal nav now links to `/menu`, `/about`, etc. with no `?lang=he`. | `balinjera-content.ts:80` | §3.2 #3 |
| ✅ P0-4 | Sitemap now emits both `he` and `en` as separate `<loc>` entries per route (16 URLs total). Verified live via `/sitemap.xml`. | `sitemap.ts` | §3.2 #4 |
| ✅ P0-5 | `buildRestaurantSchema` now takes `lang`; description is localized (verified different HE/EN copy renders on each language's page) and `hasMenu` points at the current-language menu URL. | `balinjera-schema.tsx`, `page.tsx` | §3.2 #5 |
| ✅ (bundled) | `priceRange` changed from `"₪₪"` to a real computed range `"₪10-₪160"` (min/max pulled from actual food+business menu prices, not guessed); `buildOffer` now parses the dual-priced draft beer (`"28/23 ₪"`) as a `PriceSpecification` min/max range instead of silently dropping its offer. | `balinjera-schema.tsx` | §3.2 #6 |

**Retracted during implementation:** the audit originally planned to add an explicit Saturday `closes` entry to remove ambiguity with `llms.txt`. On closer check, Google's own structured-data guidance is to *omit* closed days rather than add a zero-duration entry — an `opens`/`closes` of `"00:00"`/`"00:00"` risks being read as "open all day" rather than closed. The original omission was correct; no change made. This is exactly the kind of claim this audit's verification discipline exists to catch (see the two similar retractions in §3.1).

### P1 — high value, moderate effort (not yet implemented)

| # | Fix | File(s) | Why |
|---|---|---|---|
| P1-1 | Write an "Our Story" section (2–3 paragraphs) centered on Fanta Prada, in `balinjeraCopy.he.aboutPage` and `.en.aboutPage`, linked prominently from the homepage. No new imagery required. | `balinjera-content.ts` (`aboutPage` in both locales), `about-content.tsx` | §4.2, §5 — the single most distinctive missing content |
| P1-2 | Expand both blog posts: add 2–3 `<h2>` subheadings each, keep length increase modest, add one contextual internal link to `/menu` or `/events` per post. | `balinjera-content.ts` (`blogPage.posts` in both locales), `balinjera-blog-article-content.tsx` rendering | §4.3, §5 |
| P1-3 | Add a small `FAQPage` JSON-LD block (kosher status, gluten-free, vegan options, reservations) — schema only, no visible UI, respecting the owner's no-FAQ-section constraint. | new schema builder in `balinjera-schema.tsx`, content in both `balinjeraCopy` locales, rendered on `/` or `/menu` | §5 |
| P1-4 | Add capacity, starting price, and lead-time facts to the events page copy; add `Service`/`Offer` schema for catering. | `balinjera-content.ts` (`eventsPage` in both locales), `balinjera-events-content.tsx`, new schema in `balinjera-schema.tsx` | §4.4 |

### P2 — lower priority / longer horizon

| # | Fix | File(s) | Why |
|---|---|---|---|
| P2-1 | Add `suitableForDiet` (`VeganDiet`, `GlutenFreeDiet`) to the relevant `MenuItem` entries. | `balinjera-schema.tsx:135-161` | §4.1 |
| P2-2 | Decide deliberately on `/accessibility` indexability (leave as-is, or `noindex` if it shouldn't compete for SERP real estate) rather than defaulting. | new `robots` metadata on `accessibility/page.tsx` | §3.2 #8 |
| P2-3 | Update root layout metadata to a single-language default (Hebrew, matching site default) as a fallback rather than mixed-script. | `layout.tsx:17-19` | §3.2 #7 |
| P2-4 | Publish 1–2 new blog posts targeting proven long-tail patterns: kosher Ethiopian food near Carmel Market, Ethiopian catering in Tel Aviv. | `balinjera-content.ts` (both locales) | §2.1, §4.3 — directly targets the query pattern that already converts at 29% |

---

## 8. Measurement — what's still unverified

This audit is grounded in real Search Console and Google Business Profile data (§2.1, §6), and the P0 code fixes were verified live (§7). Two things remain **not** captured in this session:

- **GSC → Pages report**: page-level HE vs EN performance split.
- **GSC → Indexing → Pages**: whether `?lang=en` URLs are actually indexed, or being folded into the Hebrew canonical as "Alternate page with proper canonical." This is the one open question that bears on how much the sitemap/internal-link fixes (already shipped, §7) actually move — worth checking once Google has re-crawled.
- **GA4**: acquisition channels, engagement rate, landing pages, and — importantly — whether Wolt-order clicks, phone taps, and event-form submissions are tracked as events at all. If they aren't, that's a measurement gap worth closing before investing further in content.

**Now resolved:** Google Business Profile — confirmed live (§6): 6,334 total interactions, 2,640 direction requests, 1,142 calls, 1,532 website clicks over the last 6 months. It is the dominant channel for this business, not an unverified assumption.

None of the above changes this audit's core conclusion (branded organic search is strong but young, GBP is the dominant proven channel, generic-term organic ranking exists but doesn't convert, local long-tail and off-site reputation are the two biggest remaining levers) — but the two open GSC items would sharpen the specific numbers and are the natural next follow-up, once enough time has passed for Google to re-crawl the fixes shipped in §7.
