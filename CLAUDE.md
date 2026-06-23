# CLAUDE.md

Balinjera — a bilingual restaurant site: **Hebrew (RTL)** and **English (LTR)**.
Next.js 15 (App Router) + React 19 + TypeScript. Language is chosen via `?lang=he`
(default) / `?lang=en`.

## ⚠️ Top rule: every change must be applied to BOTH language versions (HE + EN)

A change is not done until it is correct in both Hebrew and English.

- **Copy / text** is duplicated per language in [src/app/balinjera-content.ts](src/app/balinjera-content.ts)
  as two parallel objects: `balinjeraCopy.he` (around line 78) and `balinjeraCopy.en`
  (around line 492). Any add, edit, or removal of text **must be made identically in
  both objects** — they must stay key-for-key in sync. Editing only one language
  silently leaves the other broken or stale.

- **Layout / JSX / CSS** is shared (one `HomePageContent` in `balinjera-shell.tsx`, one
  `balinjera.module.css`), so structural changes apply to both languages automatically.
  **But always verify both directions:** `?lang=he` renders RTL and `?lang=en` renders
  LTR. Many rules mirror via `.root[dir='ltr'] …` overrides, so a change can look right
  in one direction and wrong in the other.

- **Verify in both:** load `http://localhost:3000/?lang=he` and `http://localhost:3000/?lang=en`
  and confirm the change in each, including RTL/LTR mirroring.

## Key files

- `src/app/balinjera-content.ts` — all copy, both languages (`balinjeraCopy.he` / `.en`).
- `src/app/balinjera-shell.tsx` — shared site shell / page layout.
- `src/app/balinjera.module.css` — site styles (CSS Modules; `[dir='ltr']` overrides for LTR).
- `public/balinjera/` — images and fonts.

## Commands

```bash
pnpm dev          # http://localhost:3000
pnpm type-check   # TypeScript
pnpm lint         # ESLint
```
