# Balinjera — Monthly SEO Report, October 2026

**Site:** www.balinjera.com — kosher Ethiopian restaurant, Kerem HaTeimanim / Carmel Market, Tel Aviv. Hebrew (RTL, default) / English (`?lang=en`).
**Date:** 2026-10-27. **Supersedes:** [`SEO-AUDIT-2026-09.md`](SEO-AUDIT-2026-09.md).
**Periods:** GSC/GA4 "last 28 days" = **2026-09-28 → 10-25** vs **08-31 → 09-27** (the previous window is exactly September's "current" window). Clean post-holiday window = **Oct 4–25 vs Sep 6–27** (same weekdays, 22 days). GBP = calendar months (October data stops at Oct 23).
**Method:**
1. Raw data pulled from the owner's dashboards (Chrome profile Fantaprada: GSC, GA4, GBP) into `seo-data/2026-10/` (**local only**, git-ignored: the repo is public).
2. Four read-only agents, each started with an empty context: production/technical audit, GSC analysis, GA4 + GBP + tracking code, and blog topics with source research. Every number in the analysis was computed in Python from the exports.
3. Lead review, then the month's changes (§6). Two more independent agents then checked the work: one fact-checked the new articles against their sources, the other re-derived this report's numbers from the raw files (§8).

---

## 1. Executive summary

**October is a clear recovery. Rankings did not jump; demand came back and the site now captures more of it.**
- **Organic clicks (GSC) were +33%** (479 vs 359) and **impressions +50%** (19.7K vs 13.1K).
- **In the clean post-holiday window, clicks per day were +52%** vs the same weekdays in September (16.7 vs 11.0). That is back to the July level (−1%). The week of Oct 18–24 had 148 clicks, the best week since late August.
- **Like-for-like rankings are flat overall** (queries present in both periods). Commercial queries ("מסעדה אתיופית תל אביב"…) gained 0.2–0.3 positions like-for-like, and 8.0 → 6.7 on the whole segment. The home CTR rose from 3.1% to 3.8% after September's title change.
- **English is the fastest-growing part** of the site: EN page clicks +90% (78 vs 41), now 16% of clicks.
- **Google Business Profile is up year over year:** September 2026 vs September 2025 shows interactions +23%, calls +24%, directions +27% and website clicks +28%. October is running +16% per day above September.
- **September's fixes are all live** (Frankfurt region, metadata in `<head>`, new menu and prices, no `aggregateRating`). Lighthouse SEO is 100 on all 4 tested pages (was 92).

**The month's problems, in order of business impact:**
1. **None of the checkable owner actions from September has been done** (§5). That includes Friday hours, holiday hours, the GBP link UTM, review replies, the GA4 setup, the GBP menu, the description, the category and the service area. Two of them lose data every day they wait (§5).
2. **GA4 now records conversions, but nobody can read them properly.** The site sent 192 conversion clicks: 153 Wolt orders, 30 WhatsApp, 8 phone and 1 event lead. But there are **0 custom dimensions and 0 key events**. Event parameters are not retroactive, so the 3,831 `web_vitals` events and the language/page split of conversions are being lost day by day.
3. **The Sigd post ranked but was not clicked.** "סיגד 2026" had 1,847 impressions at position 8.1 and a 0.1% CTR: the title had neither "2026" nor the date, and Sigd falls on **Mon 9 Nov**. ✅ The title now carries "2026 (9 בנובמבר)" in HE and EN.
4. **Reviews: 13 new in 4 weeks (12×5★, 1×4★), 0 replies.** Only about 3% of the last 100 reviews have an owner reply.
5. **GA4 "Organic Search" overstates SEO.** It runs 74% above GSC clicks: the gap is 42% of GA4 organic, and GBP website clicks without a UTM (≈300 per 28 days) explain most of it. Read SEO growth from GSC (+33%), not GA4 (+29%).
6. **Content.** ✅ 2 new bilingual articles were published, chosen from GSC demand. One of them, the Beta Israel kitchen, is timed for Sigd. Both cite external sources, and that needed a new "Sources" block (§6). ✅ The unconfirmed "teff only" wording was removed from the vegan post.

---

## 2. The numbers

### 2.1 Google Search Console (web)

| | Last 28 d | Previous 28 d | Δ |
|---|---|---|---|
| Clicks | **479** | 359 | **+33.4%** |
| Impressions | 19.7K | 13.1K | +50% |
| CTR | 2.4% | 2.7% | −0.3 pt |
| Avg position | 7.6 | 7.6 | = |
| Without the new Sigd post (its page clicks / impressions removed) | ≈463 clicks / ≈16.0K impr | | ≈+29% / ≈+22% |

**Clean windows (clicks per day):**

| Window (22 days) | Clicks/day | Impr/day | CTR | Oct 4–25 vs it |
|---|---|---|---|---|
| **Oct 4–25** | **16.7** | 764 | 2.2% | — |
| Sep 6–27 (RH, YK, Sukkot eve) | 11.0 | 442 | 2.5% | **+52%** clicks/day |
| Sep 6–27 without the 7 holiday days | 12.5 | 486 | — | +33% |
| Jun 28–Jul 19 | 16.9 | 356 | 4.7% | −1% |

Reading: clicks are back to July, while impressions per day doubled at half the CTR. The extra impressions are informational (injera, buna, Sigd) at positions 8–11, where few people click.

**Segments** (query rows cover 54% of clicks; the rest is anonymised by Google):

| Segment | Clicks cur / prev | Impr cur / prev | Position |
|---|---|---|---|
| Brand (26 variants) | 171 / 145 (+18%) | 1,267 / 1,247 (=) | 2.7 / 2.8 |
| Non-brand commercial* | 57 / 48 (+19%) | 2,623 / 2,327 (+13%) | **6.7 / 8.0** |
| Informational | 24 / 3 | 7,151 / 2,835 (+152%) | 9.4 / 9.8 |
| ↳ of which Sigd | 13 / 0 | 2,880 / 0 | 8.2 |
| EN pages (`?lang=en`) | **78 / 41 (+90%)** | 5,426 / 3,251 (+67%) | 6.9 / 6.3 |

- \*The previous period excludes one junk query ("blini near me", 539 impressions). Commercial/informational rules are heuristic: informational clicks are tiny (24 / 3) and move with the rules.
- **Brand demand is flat** (impressions =), but **brand CTR recovered** from 11.6% to 13.5%. That was the unexplained CTR drop flagged in September (C2); the `<head>` fix shipped in between.
- **Commercial gained from rank:** "מסעדה אתיופית כשרה תל אביב" went from 5.1 to 2.0, "מסעדות אתיופיות תל אביב" from 7.2 to 4.5 and "אינג'רה תל אביב" from 4.5 to 2.4.
- **Losers:** "אוכל אתיופי" fell from 6.9 to 8.6 (229 impressions, home page), and "ethiopian food near me" from 4.2 to 6.2.

**Pages:**
- Home: 277 clicks (+44), position 6.1 (6.7).
- /menu: 77 clicks.
- `/?lang=en`: 50 clicks (+20).
- /about: 16 clicks (5).
- /events: position 3.9 (7.4).
- The 10 older blog posts: 36 clicks (17), 8.6K impressions.
- Sigd post: 3,698 impressions and 16 clicks (HE 2,635 / EN 1,063).

**Indexing:**
- 34 indexed (32 + Sigd HE/EN). Not indexed: 8, all expected (3 redirects, 3 `?lang=he` alternates, and the 2 junk 404s `/&` and `/$`, which now return 404).
- Sitemap read on 2026-10-22: 34 URLs, Success.
- Breadcrumbs 18 valid (was 10). Review snippets 0 (was 2), as expected after removing `aggregateRating`.
- Manual actions: none. The CWV report still says "not enough usage data" (CrUX).

### 2.2 GA4

| | Last 28 d | Previous 28 d | Δ |
|---|---|---|---|
| Sessions | 1,173 | 960 | +22% |
| Organic Search | 832 | 645 | +29% (includes GBP clicks, §2.4) |
| Direct | 304 | 289 | +5% |
| AI Assistant | 32 | 20 | +60% |
| Engagement rate | 65.5% | 57.3% | +8 pt* |
| Key events | **0** | 0 | none marked |

\*Part of the engagement gain may be measurement: `web_vitals` events went live in the same deploy.

**Conversion events.** These are new: they went live on 2026-09-30, so 26 days of data.

| Event | Count | Users |
|---|---|---|
| `order_click` (Wolt) | **153** | 126 (13.7% of users) |
| `whatsapp_click` | 30 | 29 |
| `phone_click` | 8 | 8 |
| `generate_lead` (event form sent) | 1 | 1 |
| `directions_click` | 0 | — |
| **Total** | **192** | ≈16 per 100 sessions |

- **`directions_click` = 0 is not a bug.** The site has a single Maps link, on /events, and the footer address is plain text. Directions happen on GBP instead: 539 in Oct 1–23. Fix: link the footer address once we have the GBP share link (pending since September).
- **Phone taps are rare on the site** (8, vs 172 calls from GBP), because the mobile quick-action bar holds only Wolt and WhatsApp.
- A handful of localhost test events from 2026-09-29 sit in this window. They can be excluded with the Hostname dimension. Dev fix: don't load GA on localhost (§7).
- Landing pages: home 823 sessions (+16%), /menu 190 (+24%), /about 40 (20), Sigd post 25 (new), how-to-eat-injera 12.

### 2.3 Google Business Profile

| Month | Interactions | Calls | Directions | Website | Menu views |
|---|---|---|---|---|---|
| Jul 2026 | 1,841 | 281 | 775 | 431 | 354 |
| Aug 2026 | 2,196 | 291 | 853 | 526 | 526 |
| Sep 2026 (final) | 1,359 | 227 | 565 | 324 | 243 |
| **Oct 1–23** | 1,204 | 172 | 539 | 241 | 252 |
| Oct vs Sep, per day | **+16%** | −1% | **+24%** | −3% | **+35%** |

- **YoY, Sep 2026 vs Sep 2025:**
  - profile views 29,795 (+11.2%) and searches 18,355 (+5.7%);
  - interactions **+22.7%**, calls +24.0%, directions +27.3%, website +27.6%, menu +7.0%.
  - This is conservative: Sep 2026 held RH, YK and the eve of Sukkot, while Sep 2025 held only RH.
- October YoY will flatter 2026, because Oct 2025 held YK, Sukkot and Simchat Torah. Read September and October together next month.
- Oct pro-rata ≈ 1,620 interactions, about 4% above the May–Jul average. The growth is in directions and menu views, which points to walk-in intent.
- Searches: "restaurants" leads (9.6K in Sep), then "אינג'רה" (1,292) and "אינגרה" (673).
- **Reviews:** 4.7★, **1,572** (+12 since Sep 29). The last 4 weeks brought 13 new reviews, 12×5★ and 1×4★, with **0 replies**.
- **Profile: unchanged since September.**
  - Friday is still 10:30–16:00 on GBP vs 11:00–15:00 on the site.
  - No special hours, no UTM on the website link, still the one-line description, still the "Giv'atayim" service area.
  - No structured menu; the panel keeps prompting "Add your own menu".
- Google is offering a ₪1,500 Ads credit for new advertisers. This is a business decision, and it needs key events first so the spend can be measured.

### 2.4 GA4 "Organic Search" vs GSC

| 28-d window | GA4 organic | GSC clicks | Gap | ≈ GBP website clicks (no UTM) |
|---|---|---|---|---|
| Sep | 645 | 359 | 286 (44%) | ≈309 |
| Oct | 832 | 479 | 353 (42%) | ≈294 |

GBP clicks are an estimate (monthly totals pro-rated to each window), so this is an order of magnitude, not an exact split. Until the UTM is set on the GBP link, GA4 "Organic" mixes SEO with Google Maps. The UTM separates them from the day it goes live.

---

## 3. Production / technical (`seo-data/2026-10/tech/technical-findings.md`)

**September fixes verified live:**
- `x-vercel-id: fra1::fra1`.
- On all 34 sitemap URLs, as Googlebot: 200, `<title>` and description in `<head>`, self-canonical, and he/en/x-default hreflang.
- No `aggregateRating`; `priceRange ₪7-₪220`; Menu JSON-LD with 5 sections and 40 items.
- The sitemap has 5 distinct `lastmod` dates. llms.txt lists every post and says "kosher".
- The glossary typo URL returns 308. `/&`, `/$` and unknown pages return 404.
- Both repo checks pass against production.

**Lighthouse mobile** (2–3 runs per page; another browser was running during the first runs, so they are noisy):

| Page | SEO Sep → Oct | Perf Sep → Oct runs |
|---|---|---|
| `/` | 92 → 100 | 90 → 69 / 96 / 87 |
| `/?lang=en` | 92 → 100 | 98 → 96 / 100 |
| `/menu` | 92 → 100 | 74 → 84 / 98 |
| `/blog/how-to-eat-injera` | 92 → 100 | 77 → 100 / 99 |

`lcp-lazy-loaded` now passes on home (the September fix P1). Field data: the PSI API hit its quota (429), and CrUX needs a key (403); GSC still says "not enough usage data".

| ID | Sev | Finding | Status |
|---|---|---|---|
| T-Oct-1 | P2 | Hero image lacks `fetchpriority="high"` (`scroll-expansion-hero.tsx:528`); Lighthouse flags it in 5 of 5 runs | 🔜 November, with the font-preload A/B |
| T-Oct-2 | P2 | `Cache-Control: private, no-store` on HTML also disables the back/forward cache | 📋 part of the static-rendering decision (Sept §6) |
| T-Oct-3 | P3 | Fonts served with `max-age=0` | 🔜 |
| T-Oct-4 | P3 | Every post and its OG tags reuse `hero.jpg` | 🔜 needs a photo per article (owner) |
| T-Oct-5 | P3 | About 156 KiB of image savings (the logo source is 1074 px wide) | 🔜 |
| Carried | P2–P3 | Favicon 25×36 and `/favicon.ico` 404 (T6); unbranded `/blog/<unknown>` 404 (T11); /about story rendered twice; font preloads (P2); gtag at High priority (P4); AVIF (P7); schema `@id` (T14) | 🔜 unchanged |

---

## 4. Content

**Was September's call ("no new posts in October") right?** Mostly. The 10 older posts doubled their clicks (17 → 36) on +47% impressions, with no new content. Two signals now justify new posts:
- **Sigd showed what timely content earns:** 3,698 impressions in 4 weeks for one post.
- **Dish queries have demand and no dedicated page.** Doro / tibs / siga wat drew 299 impressions and 0 clicks, and the glossary gives doro wat a single sentence.

**Opportunities measured (GSC, pos 3–15 with low CTR):**

| Query | Impr | Pos | CTR | Page | Action |
|---|---|---|---|---|---|
| סיגד 2026 | 1,847 | 8.1 | 0.1% | Sigd post | ✅ title now "חג הסיגד 2026 (9 בנובמבר)…" |
| מסעדה אתיופית תל אביב | 834 | 5.0 | 2.2% | home | 📋 watch; title already fixed in Sept |
| אינג'רה / אינגרה / אינגירה | 2,100+ | 10–12 | ≈0% | **3 URLs rotate** (blog 11.0, home 10.1, menu 9.1) | 🔜 consolidate on `injera-heart-of-meal` (body expansion, Sept C6) |
| מסעדה אתיופית | 565 | 7.1 | 1.1% | home | 📋 |
| buna / buna coffee | 245 | 8.6–9.1 | ≈0.4% | EN buna post | 🔜 add a coffee-ceremony section |
| is injera gluten free | 214 | 8.3–9.3 | ≈0.5% | EN gluten post | ⏳ blocked by "is the injera 100% teff?" |

**The two new articles (HE + EN, published 2026-10-27, each with a "Sources" section):**

| Slug | Why | Sources (all fetched and quoted on 2026-10-27) |
|---|---|---|
| `ethiopian-jewish-beta-israel-food`, "אוכל אתיופי-יהודי: המטבח של ביתא ישראל" | Rides the Sigd audience (3.7K impressions, Sigd post links to it); targets "אוכל אתיופי" (547 impressions on head terms, no informational page); the restaurant's core story | Ministry of Education (Pop portal), Maariv, Sephardic Horizons review of Hagar Salamon's *Meat Matters*, Moment, ASIF |
| `doro-wat-ethiopian-chicken-stew`, "מה זה דורו וואט? תבשיל העוף החגיגי של אתיופיה" | "מה זה דורו" at pos 4.5 and the doro cluster with 0 clicks; a menu item; includes a siga wat comparison (55 impressions not covered) | ASIF, SBS Food, NPR (via KBIA), Maariv, Moment |

- **Editorial rules.** No claim about Balinjera's recipe beyond the menu text: doro wat is "עוף עם ביצה, בצל, שום ותיבול חריף". "Without butter" follows from the documented "meat restaurant, no dairy". No "teff only".
- **Debated point left out:** the sources disagree on whether Beta Israel separated meat and dairy (Moment vs the Salamon review), so the posts say neither.
- **Not cited:** Maariv's line calling teff "a kind of barley", which is wrong.

**Next candidates (not written):**
1. Siga wat / tibs, as a comparison post: about 180 impressions.
2. Where to buy or order injera: 187 impressions at pos 15.8. It needs owner facts: is injera sold separately?
3. Ethiopian food in Tel Aviv–Jaffa: 89 impressions.
4. Teff and Ethiopian breads. Blocked by the injera composition question.

---

## 5. Owner / client actions: September status

| # | September action | Status 27 Oct |
|---|---|---|
| 1 | Confirm the real Friday hours (GBP 10:30–16 vs site 11–15) | ❌ not done |
| 2 | Sukkot / Simchat Torah special hours | ❌ not done; the deadline passed (no Yom Tov closures left until Pesach) |
| 3 | UTM on the GBP website and menu links | ✅ website link done by us on 28 Oct (pending Google review); there is still no GBP menu link |
| 4 | Reply to reviews (the 3★ first) | ❌ 0 of 13 recent |
| 5 | GA4: 5 key events + 6 custom dimensions | ✅ done by us on 28 Oct: 6 dimensions + `metric_value`, and 4 key events. `directions_click` has never fired, so it can't be marked yet |
| 6 | Structured GBP menu with the new prices | ❌ |
| 7 | Description, "Kosher restaurant" category, remove Giv'atayim, WhatsApp chat | ❌ (attributes not re-checked) |
| 8 | Wolt: address, website, hours | ? not re-checked |
| 9 | Client answers (Ram injera, organic, arak, soups, 100% teff, Mehadrin wording, kosher catering, founder's name, Maps link) | ⏳ none received |

---

## 6. Changes in this PR (HE + EN)

| Change | Files |
|---|---|
| **Sigd post:** title → "חג הסיגד 2026 (9 בנובמבר): מה זה ואיך מציינים" / "Sigd 2026 (Nov 9): the Ethiopian Jewish holiday"; `modifiedAt` 2026-10-27; "Further reading" → the new Beta Israel post | `balinjera-content.ts` |
| **New post:** `ethiopian-jewish-beta-israel-food` (5 sections, 5 sources) | `balinjera-content.ts` |
| **New post:** `doro-wat-ethiopian-chicken-stew` (5 sections, 5 sources) | `balinjera-content.ts` |
| **New "Sources" block:** optional `sources` field on posts, rendered as an ordered list after the body (external links open in a new tab) and emitted as `citation` (CreativeWork) in the BlogPosting JSON-LD | `balinjera-content.ts`, `balinjera-blog-article-content.tsx`, `balinjera-article.module.css`, `balinjera-schema.tsx` |
| **Related-post cycle:** Sigd → Beta Israel → doro wat → catering. Every post still gets exactly one inbound "Further reading" link | `balinjera-content.ts` |
| **Vegan post:** "מקמח טף בלבד" / "teff flour alone" → "מקמח טף" / "teff flour" (unconfirmed by the owner) | `balinjera-content.ts` |
| llms.txt: Sigd date + the 2 new posts | `public/llms.txt` |

The sitemap, the blog index and hreflang pick up the new posts automatically from the content file.

---

## 7. November plan

**Done by us on 28 Oct (agency decision, without waiting for the owner):**
- GA4 custom dimensions (event scope):
  - `page_lang`, `page_type`;
  - `metric_name`, `metric_rating`;
  - `method`, `form_id`.
- GA4 custom metric: `metric_value` (standard unit).
- GA4 key events: `order_click`, `whatsapp_click`, `phone_click` and `generate_lead`. Star `directions_click` the first time it shows up in Admin → Events.
- GBP website link → `https://www.balinjera.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_listing`. The URL returns 200 with no redirect. Google's review was pending when we saved it.
- Dimensions are not retroactive: page and language splits start on 28 Oct. GA4 "Organic" stops mixing in GBP clicks once Google approves the link change.

**Not requested from the owner this month (agency decision):**
- the Sigd GBP post;
- review replies;
- Friday hours;
- the GBP menu;
- the description, category and service area.

They stay listed in §5 as open, for reference.

**Us:**
- After deploy, run URL Inspection → Request indexing for the 4 new URLs and the Sigd post (HE + EN), **by Mon 2 Nov**.
- Font-preload A/B (P2), hero `fetchpriority` (T-Oct-1), gtag `lazyOnload` (P4), and no GA on localhost.
- Consolidate the injera cluster on `injera-heart-of-meal` (body expansion; remove "אינג׳רה" emphasis from the competing titles only if the data confirms it).
- Add a coffee-ceremony section to the buna post.
- Next month's measurement: Sep + Oct together for GBP YoY, the first Sigd peak, the 2 new posts, web vitals by page (dimensions registered on 28 Oct), and the share of GA4 traffic tagged `gbp_listing`.
- The `/en/` decision triggers from September §6 are still not met. EN is 16% of clicks (78 / 28 d), against a trigger of ≥20% or ≥150 clicks for 2 months; re-check in December.

---

## 8. Verification log

**Independent article check** (fresh-context agent; it fetched all 7 cited URLs, each HTTP 200):
- Every factual sentence is supported by a cited source or by the site's own facts (menu, kosher certificate, About). There is no "only teff" claim, and the meat/dairy separation is not asserted.
- HE/EN parity is OK.
- Render with the Googlebot UA, local production build:
  - all 4 URLs return 200 with the correct `<html lang dir>`;
  - title, description, canonical and hreflang are in `<head>`;
  - 5 source links each open in a new tab (`target=_blank`);
  - the BlogPosting JSON-LD has a 5-item `citation`;
  - the sitemap has all 4 URLs with hreflang.
- `verify-seo-contract` ✅ and `verify-rendered-seo` ✅ against the local build.
- **Fixes applied from its review:**
  - ASIF's real name, "Culinary Institute of Israel" / "המרכז לתרבות האוכל בישראל";
  - the EN doro excerpt shortened to 158 chars;
  - "עוד ב-2015" (meaning reversal) → "ב-2015 עדיין";
  - "Genna" removed, since NPR doesn't name it;
  - הקסים spelled one way throughout, plus 5 Hebrew wording fixes;
  - Salamon attributed via the review; the Maariv quote attributed to Hanna Tamano;
  - "kosher versions replace it, for example with oil";
  - dabo glossed neutrally, and "share on one large injera" softened.

**Independent number check** (fresh-context agent recomputing from `seo-data/2026-10/` with Python):
- All GSC totals, clean windows, Brand, EN, Sigd, pages, indexing, GA4, GBP ratios, §3 and §4 reproduce.
- **Fixed:**
  - "without Sigd" impressions → +22%, not +29%;
  - the 42% is the GA4−GSC gap, not the GBP share;
  - the commercial position wording (like-for-like vs segment);
  - +33%, not +34%;
  - 26 days, not 25;
  - menu views, not directions, grow fastest.
- Cluster sizes in §4 reproduce within ±10% (they depend on the query set).


- Data integrity:
  - the GSC previous window (Aug 31–Sep 27) matches September's "current" export exactly (brand query באלינג'רה: 60 clicks / 382 impressions in both);
  - GBP October daily values sum to the 1,204 total.
- `pnpm type-check` ✅, `pnpm lint` ✅ (the 3 pre-existing `no-console` warnings only), `node scripts/verify-seo-contract.mjs` ✅, `pnpm build` ✅ (re-run after the fixes).
- Nothing was changed in GBP or GA4 (read-only). No push, no deploy.
