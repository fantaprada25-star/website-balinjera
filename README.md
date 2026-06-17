# Balinjera

Site du restaurant **Balinjera** (cuisine éthiopienne traditionnelle, Tel Aviv) — bilingue hébreu (RTL) / anglais (LTR).

Extrait du monorepo `sitekept-templates` pour devenir un projet client autonome.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Animations : `framer-motion` (hero) + observer maison (`balinjera-motion.tsx`)
- Styles du site : CSS Modules (`src/app/balinjera.module.css`, police Futurism via `@font-face`)
- Icônes : `lucide-react`

## Démarrage

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Autres commandes :

```bash
pnpm build        # build production
pnpm start        # serveur production
pnpm type-check   # vérification TypeScript
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Structure

Le site est servi à la **racine** :

| Route | Page |
|---|---|
| `/` | Accueil |
| `/about` | À propos |
| `/menu` | Menu |
| `/events` | Événements (formulaire de demande) |
| `/blog`, `/blog/[slug]` | Blog |
| `/accessibility` | Déclaration d'accessibilité |

Bascule de langue via le paramètre `?lang=en` / `?lang=he`.

Contenu et copies centralisés dans `src/app/balinjera-content.ts`. Coquille / layout du site dans `src/app/balinjera-shell.tsx`. Assets (images, polices) dans `public/balinjera/`.

## Variables d'environnement

Voir `.env.example`. Copier dans `.env.local` :

- `NEXT_PUBLIC_SITE_URL` — URL publique (canonicals + sitemap).
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — pour le formulaire d'événements (voir ci-dessous).

## À faire avant mise en production client

- **Formulaire d'événements** (`src/app/events/event-inquiry-form.tsx`) : actuellement purement côté client, il n'envoie aucun email (message de confirmation local uniquement). À brancher sur une server action Resend.

## Déploiement

Vercel (preset Next.js auto-détecté). Production = branche `main`, previews = branche `dev`. Définir `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement Vercel.
