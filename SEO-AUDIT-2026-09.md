# Balinjera — Monthly SEO Report & Audit, September 2026

**Site:** www.balinjera.com — kosher Ethiopian restaurant, Kerem HaTeimanim / Carmel Market, Tel Aviv. Hebrew (RTL, default) / English (`?lang=en`).
**Date:** 2026-09-29. **Supersedes:** [`SEO-AUDIT-2026-08.md`](SEO-AUDIT-2026-08.md).
**Periods:** GSC/GA4 "last 28 days" = **2026-08-31 → 09-27** vs **08-03 → 08-30**; month view Sep 1–27 vs Aug 1–27; GBP calendar months (Sep partial, ~25 days).
**Method:**
1. Raw data pulled from the owner's dashboards (Chrome profile Fantaprada: GSC, GA4, GBP) and saved in `seo-data/2026-09/`. That folder is **local only** (git-ignored): this repository is public and the exports are client data.
2. Four specialised audit agents in parallel (technical, content/on-page from GSC queries, local/GBP + measurement, Core Web Vitals), each read-only, each listing the claims it rejected.
3. Lead-auditor review: every finding re-checked against source/data before anything was applied (§8 lists what was verified and how).
4. Fixes applied in HE + EN, verified by type-check, lint, build, `scripts/verify-*.mjs`, and live rendering of `?lang=he` and `?lang=en`.

---

## 1. Executive summary

**The −50% click drop is falling demand, not an SEO regression.**
- Brand impressions halved at a constant position (~2), and non-brand rankings are flat like-for-like (+0.13).
- The step-down starts with the end of the summer holidays (week of Aug 30). The Tishrei holidays deepened it.
- GBP says the same: September is below August, but still 14–18% above the Feb–Jul monthly average.
- So the month's real problems are not rankings. They are the accuracy and measurement issues below.

**What was wrong this month, in order of business impact:**
1. **Prices were wrong on the site.** The owner changed the menu: about 30 prices up, 7 new items, 5 gone.
   - Before this PR, /menu and its Menu JSON-LD quoted prices 25–50% below the bill.
   - ✅ Fixed in HE + EN, with `priceRange` now computed from the menu.
2. **Hours don't agree anywhere, and no holiday hours were published.**
   - Friday: 11:00–15:00 on the site/schema/llms.txt, 10:30–16:00 on GBP, 10:00–17:15 on Wolt.
   - GBP showed regular hours on Rosh Hashana and Yom Kippur.
   - ⏳ Owner/client to confirm. The site now has a holiday-hours mechanism that is ready but empty, and we will not publish guessed hours.
3. **Every page served `<title>` and meta description in `<body>`**, for Googlebot and for AI crawlers.
   - This was Next.js 15's streaming metadata. It also generated the two junk 404s in GSC (`/&`, `/$`).
   - ✅ Fixed with `htmlLimitedBots: /.*/`, and verified on all 32 sitemap URLs.
4. **Zero conversion measurement.** GA4 had 0 key events, so phone taps, WhatsApp, Wolt orders, directions and event leads were invisible.
   - GA4 "Organic Search" also silently includes untagged GBP clicks.
   - ✅ Five conversion events plus real-user Core Web Vitals are now sent to GA4.
   - ⏳ Owner marks them as key events and adds a UTM to the GBP website link.
5. **Policy risk:** `aggregateRating` (TripAdvisor 4.7/179) on our own Restaurant schema violates Google's review-snippet guidelines, which were updated 2026-09-08. ✅ Removed.
6. **CTR / on-page.**
   - The home title lacked "מסעדה אתיופית כשרה".
   - The August kosher-post retitle lost its clicks (3 → 0).
   - Injera, dish and buna posts rank on page 1 with ~0 clicks.
   - Every article's "Further reading" pointed at the same post.
   - ✅ Titles and metas rewritten in HE + EN for 5 pages (home, about, menu, events, blog) and 6 posts (plus a shorter EN snippet on a seventh), and the related-post links now form a cycle in which every article gets one link.
7. **Performance.**
   - The home LCP image had been lazy-loaded since August fix #4.
   - Server rendering ran in Washington (`iad1`) for a 92.5%-Israeli audience.
   - ✅ Hero image made eager with a single URL. ✅ Functions pinned to Frankfurt (`fra1`).
   - The `/en/` URL migration is **not recommended now** (§6).

**Owner / client actions (nothing was changed in GBP by us):** see §7. The top three:
- confirm the real Friday and holiday hours, and set them in GBP;
- set the GBP website link to `https://www.balinjera.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing`;
- reply to the recent reviews, starting with the 3★.

---

## 2. The numbers

### 2.1 Google Search Console (web)

| | Last 28 d | Previous 28 d | Δ |
|---|---|---|---|
| Clicks | 359 | 718 | **−50%** |
| Impressions | 13.1K | 13.6K | −3% |
| CTR | 2.7% | 5.3% | −2.6 pt |
| Avg position | 7.6 | 6.6 | +1.0 |
| Sep 1–27 vs Aug 1–27 | 326 clicks vs 675 | 12.5K impr vs 12.4K | |

Segmented (content agent, brand regex built from the 556 queries):

| Segment | Clicks cur / prev | Impr cur / prev | Pos |
|---|---|---|---|
| Brand (29 variants) | 145 / 314 (−54%) | 1,249 / 2,279 (−45%) | 2.7 / 2.4 |
| Non-brand commercial core | 48 / 75 | 1,958 / 2,620 (−25%) | 6.0 / 5.5 |
| New informational (gluten, buna, dishes, how-to) | 1 / 0 | 1,135 / 194 | 9.3 |
| HE URLs / EN URLs | 328 / 654 · 41 / 75 | 16.4K / 22.7K · 3.3K / 2.4K (+38%) | |
| Mobile / Desktop | 296 / 610 · 62 / 105 | 10.2K / 11.3K · 2.9K / 2.2K | 6.6 / 5.4 · 11.3 / 13.0 |

**Reading:** the drop is demand, not rankings.
- Brand impressions halved at a constant position (~2) and stable CTR. Like-for-like position change on queries present in both periods is +0.13 (non-brand) / +0.31 (brand). The core brand terms are unchanged.
- The step-down happened in the week of Aug 30 – Sep 5 (end of the Israeli summer holiday), before any holiday. The 7 holiday / holiday-eve days (Sep 11–13, 20–21, 25–26) averaged 7.7 clicks/day vs 14.5 on other days.
- Headline CTR and position are also diluted by the six August posts (≈1.1K informational impressions at position ~9 with 1 click) and by the brand share falling from 29% to 16% of impressions.
- Caveat: September is also ~−33% clicks/day vs **July**, so it is not only "August was exceptional". Brand demand/day is ~−30% vs July; part of it is not explained by the data (see C2 in §4).

Other GSC facts:
- **Indexing:** 32 indexed (= sitemap). Not indexed: 3 trailing-slash redirects and 3 `?lang=he` alternates (both expected), plus 2 junk 404s (`/&`, `/$`) that come from React's streaming runtime (§3, T1).
- **`?lang=en` URLs are indexed and rank:** `/?lang=en` pos 4.0, 30 clicks.
- **Core Web Vitals report:** "not enough usage data in the last 90 days" (mobile and desktop).
- **Sitemap:** OK, read 2026-09-23. **Enhancements:** breadcrumbs 10 valid, review snippets 2 valid. **Manual actions:** none.

### 2.2 GA4

| | Last 28 d | Previous 28 d | Δ |
|---|---|---|---|
| Sessions | 960 | 1,656 | −42% |
| Organic Search sessions | 645 | 1,296 | −50% |
| Direct | 289 | 301 | −4% |
| AI Assistant | 20 | 41 | −51% |
| Engagement rate | 57.3% | 61.1% | |
| **Key events** | **0** | **0** | |

- Sessions landing on `?lang=en`: ~8% of views (144 / 1,770).
- **GA4 "Organic Search" is ~20–45% untagged GBP traffic.** The GBP website link has no UTM, and GA4 organic sessions run 80% above GSC clicks; GBP website clicks account for most of that gap. The GA4 organic −50% is therefore not an SEO number.
- Only enhanced-measurement events exist (page_view, scroll, outbound click 189, form_start 3). Phone taps, WhatsApp, Wolt orders, directions and event-inquiry submissions are not measured.

### 2.3 Google Business Profile

| | Aug 2026 | Sep 2026 (≈25 d) | YoY Aug |
|---|---|---|---|
| Profile views | 39,759 | 24,321 | +4.1% |
| Searches | 24,760 | n/a yet | −3.2% |
| Interactions | 2,196 | 1,041 | |
| Calls | 291 | 187 | +18.8% |
| Directions | 853 | 417 | +41.7% |
| Website clicks | 526 | 251 | +54.3% |
| Menu views | 526 | 186 | +89.9% |
| Rating | 4.7★ · **1,560 Google reviews** | | |

- 94–95% of views are on phones, 53% on Google Maps; 53% of profile searches are the generic "restaurants".
- Pro-rated September is still 14–18% **above** the Feb–Jul monthly average: August was the peak, not September the anomaly.
- Calls per effective opening day fell only ~10%.

---

## 3. Context of the month: holidays, hours and the new menu

| Item | Site | Schema | GBP | Wolt | Status |
|---|---|---|---|---|---|
| Friday hours | 11:00–15:00 | 11:00–15:00 | **10:30–16:00** | 10:00–17:15 | ❌ owner to confirm |
| Holiday hours (Rosh Hashana, Yom Kippur, Sukkot, Simchat Torah) | none | none | **none set** | — | ❌ owner to confirm |
| Menu & prices | old menu | old Menu JSON-LD, `priceRange ₪10-₪160` | no structured menu | Wolt already shows new prices (e.g. meat for 2 = 155 ₪) | ✅ site fixed this PR (§6) |

- GBP kept showing regular hours on Rosh Hashana and Yom Kippur.
- Both remaining Yom Tov days (Sat 26 Sep, Sat 3 Oct) are Saturdays, already closed. Still at risk: **Chol HaMoed (29 Sep–1 Oct) and Fri 2 Oct (Hoshana Rabba)**.
- The site now has a data-driven holiday-hours mechanism (§6), but it stays **empty until the owner confirms hours**; we do not publish guessed hours.

---

## 4. Findings by area

Status: ✅ applied in this PR · ⏳ owner / client · 🔜 deferred (next sprint) · 📋 report only.
Full agent reports with evidence and rejected claims are summarised here; the lead verified every ✅ item before applying it (§8).

### 4.1 Technical

| ID | Sev | Finding | Status |
|---|---|---|---|
| T1 | P1 | `<title>`, meta description, OG tags, icons and the GSC verification tag streamed into `<body>` for Googlebot, GPTBot, ClaudeBot, PerplexityBot and real users (Next 15.2+ streaming metadata; Googlebot is deliberately excluded from Next's `htmlLimitedBots` default). The same streaming runtime contains the string literals `"/$"` and `"/&"`, which Googlebot turned into the two junk 404s. | ✅ `htmlLimitedBots: /.*/` |
| T2 | P1 | `aggregateRating` (TripAdvisor 4.7/179) on our own Restaurant schema, not visible on the page. Google's guidelines: *"Don't aggregate reviews or ratings from other websites."* A business's own LocalBusiness pages are also ineligible for stars. | ✅ removed |
| T3 | P1 | Friday hours conflict; hours hard-coded in 4 places; no holiday hours | ✅ single `BALINJERA_OPENING_HOURS` constant feeds both footers and the schema · ⏳ real values |
| T4 | P1 | Menu, Menu JSON-LD and `priceRange` (`₪10-₪160`) stale | ✅ |
| T5 | P2 | Sitemap `lastmod` = build time for all 32 URLs | ✅ real content dates (5 distinct values) |
| T6 | P2 | Favicon 25×36 (Google requires square, ≥48 px); no `/favicon.ico` | 🔜 needs a design asset |
| T7 | P2 | "Further reading" always linked the first post; the 6 August posts had no article links | ✅ `relatedSlug` cycle |
| T8 | P2 | `llms.txt` unchanged since June: 2/10 articles, never says "kosher" | ✅ |
| T9 | P2 | FAQ says the injera is gluten-free without the caveat the dedicated post uses | ⏳ owner: is the injera 100% teff? |
| T10 | P3 | WhatsApp link kept the domestic trunk 0 (`9720559655559`). It works, but it isn't normalized. | ✅ `wa.me/972559655559` |
| T11 | P3 | `/blog/<unknown>` serves an empty error shell instead of the branded 404 | 🔜 |
| T12 | P3 | `/blog/ethiopian-dish-glossary` (typo slug) got impressions and 404ed | ✅ 308 → `ethiopian-dishes-glossary` |
| T13 | P3 | `/cdn-cgi/l/email-protection` in GA4 is a leftover of the old Cloudflare-proxied WordPress site (7 sessions, noise) | 📋 |
| T14 | P3 | Schema hygiene (`@id` graph, `sameAs` includes Wolt, author Person, dates without TZ) | 🔜 |
| T15 | P3 | EN vegan-post description 171 chars | ✅ 154 |
| T16 | P3 | `.env.example` pointed at `balinjera.vercel.app`; the verify script couldn't catch T1 | ✅ both fixed; `verify-rendered-seo.mjs` now fetches as Googlebot and asserts `<title>`/description are in `<head>` and that sitemap `lastmod` values are not one build time |
| C1 | P0 carried | Zero HTML caching (`private, no-store`), August §3 | 📋 see §6 |

### 4.2 Content / on-page (from GSC queries)

| ID | Sev | Finding (evidence) | Status |
|---|---|---|---|
| C1 | P1 | −50% is brand/seasonal demand: brand −54% clicks at pos 2.4 → 2.7; non-brand commercial −36% clicks with −25% impressions; like-for-like ranks flat | 📋 report KPIs in 4 segments (regex in content report); compare October on Oct 5 → Nov 1 |
| C2 | P2 | CTR fell at stable positions (brand 13.8 → 11.6%), unexplained by the data | 📋 re-measure after T1 ships |
| C4 | P1 | Home title lacked the commercial head term ("מסעדה אתיופית תל אביב" 605 impr pos 5.4; kosher variants convert at 10.8% CTR) | ✅ `באלינג׳רה — מסעדה אתיופית כשרה בתל אביב, ליד שוק הכרמל` / `Balinjera — Kosher Ethiopian Restaurant in Tel Aviv` |
| C5 | P1 | August kosher-post retitle cannibalised the home page (post clicks 3 → 0) | ✅ re-angled to "מסעדה כשרה ליד שוק הכרמל" (non-Ethiopian kosher-at-Carmel cluster) · ⏳ "not Mehadrin" wording |
| C6 | P1 | Injera is the biggest non-brand pool (1,845 impr, pos 9.9, 8 clicks) served by a poetic title | ✅ "מה זה אינג׳רה? הלחם האתיופי מקמח טף" · 🔜 body expansion |
| C7 | P2 | Dish cluster (doro, tibs: 272 impr, +404%) vs glossary title leading with shiro (0 impr) | ✅ title/excerpt · 🔜 one-H2-per-dish restructure |
| C8 | P2 | Degenerate internal linking | ✅ related posts (T7) · 🔜 money-page → blog links |
| C9 | P2 | HE blog suffix 18 chars pushes titles to 57–60 | ✅ ` | באלינג׳רה` |
| C10–C12 | P2–P3 | Gluten (EN-only demand), buna, how-to snippets | ✅ titles/excerpts, no new claims |
| C13 | P3 | /about impressions are brand sitelinks; story block rendered twice | ✅ title/meta (no commercial term) · 🔜 duplicate block · ⏳ founder's full name |
| C14 | P2 | /events: no keyword in H1/title | ✅ title/meta/H1. "Kosher" stays tied to the restaurant only: the certificate is not documented for catering. · ⏳ group-menu facts, kosher catering |
| C15 | P3 | /blog index copy | ✅ |
| C16 | P0/P1 | New menu | ✅ (§5) |
| C18 | P2 | EN = 11% of clicks, 17% of impressions; EN clicks are brand, EN growth is informational | 📋 feeds §6 |
| C20 | P1 | No query×page data: cannibalisation is inferred | 📋 export next month (list in content report) |

**Roadmap call:** no new posts in October. The 6 August posts brought 2.9K impressions and 7 clicks, so the ceiling is CTR and rank on pages that already rank on page 1.

### 4.3 Local SEO / GBP / measurement

| ID | Sev | Finding | Status |
|---|---|---|---|
| L1 | P0 | Friday hours: GBP 10:30–16:00 vs site 11:00–15:00 vs Wolt 10:00–17:15 | ⏳ owner |
| L2 | P1 | No GBP special hours for any 2026 holiday. Still at risk: Chol HaMoed 29 Sep–1 Oct and Fri 2 Oct (both Yom Tov days are Saturdays, already closed) | ⏳ owner, **by Wed 30 Sep** |
| L3 | P1 | No holiday hours on site/schema | ✅ mechanism (empty until confirmed) |
| L4 | P1 | GA4: 0 key events | ✅ events · ⏳ owner marks key events |
| L5 | P1 | GBP website = apex without UTM; ≈20–45% of GA4 "Organic Search" is really GBP | ⏳ owner |
| L6 | P1 | Recent reviews unanswered (incl. a 3★) | ⏳ owner |
| L7 | P1 | No structured GBP menu | ⏳ owner (use the new /menu as the reference) |
| L8 | P1 | GBP description is one line (29 chars of 750) | ⏳ owner: a Hebrew draft built only from site facts is in the local report |
| L9–L12 | P2 | Add "Kosher restaurant" category; review the Google-suggested attributes; photos/posts cadence; WhatsApp chat link | ⏳ owner |
| L13 | P2 | `aggregateRating` | ✅ (T2) |
| L14 | P2 | Only one Maps link on the site (text query on /events), no `hasMap` | ⏳ owner sends the GBP share link → then code |
| L15 | P2 | Wolt: "Malan 2", website = Facebook page, hours 11–21 / Fri 10–17:15 | ⏳ owner |
| L16 | P3 | GBP service area "Giv'atayim" on a Tel Aviv storefront | ⏳ owner |
| L17 | P3 | "Reserve your table now" button opens Wolt (delivery) while the FAQ says reserve by phone | 🔜 business decision |

### 4.4 Core Web Vitals (lab only — no field data exists)

| ID | Sev | Finding | Status |
|---|---|---|---|
| P1 | High | Home LCP = hero foreground `<img>`, `loading="lazy"` since August fix #4 | ✅ `priorityMedia` restored; foreground `sizes="100vw"` = same URL as the background, so there is one preload and one download (verified) |
| P2 | Med | /menu and blog "4 s render delay" is mostly a Lighthouse-harness artifact triggered by the two render-blocking font preloads (real browser ≈1 s) | 🔜 A/B on a Vercel preview (remove preloads) |
| P3 | Med | Function region `iad1` (Washington) for a 92.5%-Israeli audience: ≈90 ms per HTML request | ✅ `vercel.json` → `fra1` |
| P4 | Med | GA `gtag.js` (177 KB) preloaded at High priority competes with the hero/fonts | 🔜 `lazyOnload` A/B (the new event code already works without `<GoogleAnalytics>`) |
| P5 | High (process) | No field data: GSC "not enough usage data", CrUX unavailable, ~760 users / 28 d | ✅ web-vitals → GA4 (`web_vitals` event: metric, value, rating, page_lang, page_type) |
| P6 | Med | All HTML dynamic, no CDN cache | 📋 §6 |
| P7–P8 | Low | AVIF not enabled; fonts not subset (−27% measured) | 🔜 |

---

## 5. The new menu (applied)

Source: the owner's printed September menu (local: `seo-data/2026-09/menu-2026-09-owner.jpg`, diff in `seo-data/2026-09/menu-diff.md`).

- **Changes:**
  - 21 dishes and 2 business-lunch items; prices up on almost every dish (e.g. vegan for two 85 → 120, meat for two 115 → 155, Festival 160 → 220).
  - New: green dish, special hot peppers plate, Ram injera, tibs for two, Sprite, cocktail, whiskey.
  - Discontinued: extra injera, malt beer, Carlsberg draft, Tuborg, Somersby.
  - Drinks regrouped as on the printed menu: soft drinks / hot drinks / alcohol, which gives 5 sections that all fit the /menu hero board.
- **Hebrew names for the new items:** proposed by us (the printed menu is English-only). Spelling standardised to "אינג׳רה" in the menu.
- **Schema:**
  - `priceRange` is now computed from the menu (`₪7-₪220`).
  - `MEAT_PATTERN` extended to chicken/beef (עוף/בקר). The new descriptions say "+ 2 vegan sides", which would otherwise have tagged doro wat and siga wat `VeganDiet`.
- **Not published, pending the client:**
  - the Ram injera tagline ("The first NuActing dish in Israel");
  - the "100% Organic & Grass fed" footnote ("organic" is a regulated claim);
  - which arak price is glass vs chaser (published as "40/25 ₪", as printed).

---

## 6. Decision: the `/en/` URL migration — **not now**

- **What the migration would buy** is CDN caching, by removing `searchParams`. That does not require new URLs: a middleware rewrite from `?lang=en` to internal static per-locale routes gets the same TTFB with **no URL change and no SEO risk**.
- **What it would risk.** EN is 11% of clicks, and it is the only segment growing (+38% impressions). Its `?lang=en` URLs are indexed and rank (`/?lang=en` pos 4.0). A URL migration would put that at risk for ≈0.1 s of TTFB.
- **What exists today:**
  - no field CWV data at all;
  - the measured lab bottlenecks were the lazy hero image, the region hop, the font preloads and GA contention.
  - The first two are fixed in this PR; the other two go to a preview A/B.

**Triggers that would change the decision** (re-assess in Q1 2027 with ≥ 8 weeks of the new `web_vitals` data):
- *Performance, which means static per-locale rendering without a URL change:*
  - mobile TTFB p75 > 800 ms in Israel after `fra1`;
  - LCP p75 > 2.5 s with TTFB ≥ 30% of it;
  - cold starts on ≥ 20% of invocations.
- *SEO / product, which means the full `/en/` migration:*
  - EN ≥ 20% of organic clicks (or ≥ 150 clicks / 28 d) for 2 consecutive months;
  - a third language;
  - GSC folding `?lang=en` into HE ("Duplicate, Google chose different canonical").

The full migration outline (routes, 301 map, hreflang, sitemap, GSC plan) is ready if a trigger fires. Per the brief it would ship as its own PR, after your go-ahead.

---

## 7. Owner / client action list

| # | Action | Where | Deadline |
|---|---|---|---|
| 1 | Confirm the **real Friday hours**. Then either fix GBP, or tell us so we change the constant (one line, both languages + schema + llms.txt) | GBP / us | now |
| 2 | Confirm **Sukkot / Simchat Torah hours**: Chol HaMoed 29 Sep–1 Oct and Fri 2 Oct. Enter them in GBP → Special hours; send them to us for the site list | GBP / us | Wed 30 Sep |
| 3 | GBP website link → `https://www.balinjera.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing`; menu link → `…/menu?utm_source=google&utm_medium=organic&utm_campaign=gbp_menu` | GBP | now |
| 4 | Reply to recent reviews (the 3★ first) | GBP | this week |
| 5 | GA4 → Admin → Key events: create `phone_click`, `whatsapp_click`, `order_click`, `directions_click`, `generate_lead`. Register custom dimensions `page_lang`, `page_type`, `metric_name`, `metric_rating`, `method`, `form_id` | GA4 | after deploy |
| 6 | Structured GBP menu with the new prices, plus a menu photo | GBP | this week |
| 7 | New GBP description (Hebrew draft in the local report); add the secondary category "Kosher restaurant"; review the pending Google attribute suggestions; remove the "Giv'atayim" service area; add a WhatsApp chat link if the number is monitored | GBP | this month |
| 8 | Wolt: address → Malan 4, website → balinjera.com, check hours | Wolt support | this month |
| 9 | Answers we need:<br>• Ram injera: the tagline, and whether "ראם אינג׳רה" is the right Hebrew name<br>• organic / grass-fed certification<br>• arak glass/chaser prices<br>• soup add-ons (28 / 55 ₪) cost more than the soup (40 ₪): correct?<br>• is the injera 100% teff?<br>• "not Mehadrin" wording<br>• does the kosher certificate cover catering / off-site events?<br>• founder's full name on /about<br>• the GBP Maps share link | client | — |

---

## 8. Verification log

**Lead review of the audit claims before applying:**
- `htmlLimitedBots`: the top-level key, typed `RegExp`, exists in `node_modules/next/dist/server/config-schema.js:527`, and `streaming-metadata.js` confirms the UA regex logic.
- Google review-snippet guidelines, fetched 2026-09-29 (updated 2026-09-08): the no-aggregation rule is quoted in T2.
- `balinjera-blog-article-content.tsx:60` confirmed that the related post was always the first one.
- /about renders the story twice (`about-content.tsx:48` and `:87`); deferred.
- Each new blog excerpt was checked against the post body: every promised element exists in HE and EN (e.g. right hand / tear / pinch in how-to; Rabanut / Regila / no dairy in the kosher post).
- An A/B rebuild without the hero change showed that an intermittent pale-hero frame in the preview pane happens without our change too. It is a capture artifact, not a regression.

**After applying (local production build, `pnpm start`):**
- `pnpm type-check` ✅. `pnpm lint` ✅ (only the 3 pre-existing `no-console` warnings in `api/event-inquiry`). `pnpm build` ✅.
- `node scripts/verify-seo-contract.mjs` ✅. `node scripts/verify-rendered-seo.mjs` ✅, now with the Googlebot UA, the `<head>` assertions and the `lastmod` check.
- All 32 sitemap URLs, Googlebot UA:
  - `<title>` and meta description inside `<head>`, 0 occurrences of the `"/&"` runtime;
  - `<html lang dir>` is `he`/`rtl` or `en`/`ltr` as expected;
  - titles ≤ 61 chars, descriptions ≤ 158.
- **Schema:**
  - no `aggregateRating`; `priceRange ₪7-₪220`;
  - Menu: 5 sections, 40 items, all with an Offer; VeganDiet only on the 3 vegan platters per language; doro wat and siga wat are not tagged vegan.
- **Hero:** one image preload and both layers eager, loading the same URL.
- `/blog/ethiopian-dish-glossary?lang=en` → 308 → `/blog/ethiopian-dishes-glossary?lang=en`.
- **Related posts:** each of the 20 articles gets exactly one inbound "Further reading" link, and EN links keep `?lang=en`.
- **GA4:** events queued correctly on `dataLayer` (`web_vitals`, `phone_click`, `order_click` with `method=wolt`, `whatsapp_click`, each with `page_lang` and `page_type`).
  - *Note:* local testing used the production GA4 ID, so a handful of test events from localhost reached the property on 2026-09-29.
- **Holiday hours:** tested with temporary entries, then removed.
  - A past date is filtered out, and upcoming ones render in the footer's hours column in HE ("חול המועד סוכות (יום ה׳, 1.10): 12:00-18:00 · הושענא רבה (יום ו׳, 2.10): סגור") and EN.
  - `specialOpeningHoursSpecification` has the correct dates, and closed = `00:00/00:00`.
  - RTL and LTR layout checked visually.
- **Visual checks in both languages:** /, /menu (all sections, `40/25 ₪` range prices), /events (new H1), /about footer, and a blog article.
- **An independent verification agent** re-checked the diff: the menu against the printed menu image, HE/EN parity (0 key or length mismatches), facts, and code. It confirmed the menu 1:1 in both languages, and I fixed everything it raised:
  - **Blocker: the repo is public.** Raw exports are no longer committed; `seo-data/` is git-ignored.
  - **New "kosher catering" claim** on /events: kosher is now tied to the restaurant only.
  - **Latent TS2717:** a `dataLayer` global-type clash with `@next/third-parties` that only passed because of file order. Now a local cast.
  - **Gluten snippet:** it promised facts the body doesn't contain, and HE/EN differed. Now aligned with the body.
  - **Web-vitals handler:** hoisted to module scope, so there are no duplicate subscriptions, and FID is dropped.
  - **Stricter click host matching.**
  - **Holiday window:** DST-safe day arithmetic, entries sorted by date.
  - **`priceRange` guard** for an empty menu.
  - **Pre-existing buna-post claim** that spiced black tea is "caffeine-free": removed.
  - **Contract script** now fails on a `relatedSlug` that doesn't exist or points at its own post, and on an invalid holiday date (negative-tested).
  - **Render script** checks `dateModified` by pattern, the absence of `aggregateRating`, the "Further reading" link and the 308 redirect.

**To verify after deploy:**
- `curl -sI https://www.balinjera.com/ | grep x-vercel-id` should show `fra1::fra1::…`.
- Googlebot-UA curl should show `<title>` before `</head>`.
- Lighthouse mobile on `/`: `lcp-lazy-loaded` passes; meta-description = 1.
- GA4 Realtime should show `web_vitals` and click events.
- GSC: resubmit the sitemap, and inspect `/menu` and `/` in both languages.

---

## 9. Next month (October audit)

- Pull the GSC **query × page** exports (C20) and the GBP monthly series Feb → Oct 2026 plus Sep–Oct 2025, for a holiday-aligned YoY.
- Read the first 4 weeks of `web_vitals` (p75 by page_type × lang) and the new key events.
- Measure October on **Oct 5 → Nov 1** against the same window in September, segmented brand / commercial / informational.
- Preview A/B for the font preloads (P2) and GA `lazyOnload` (P4). Then AVIF.
- If the client answers: publish the holiday hours and Friday fix, the gluten wording, the organic claim and the Ram injera text. Also the glossary per-dish restructure, the injera pillar body, the /events group-menu block, and the /about duplicate block.
- Raw data for this report: `seo-data/2026-09/` (local, git-ignored; `README.md` there indexes every export).
