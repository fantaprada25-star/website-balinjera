import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'

import { getSiteUrl } from './balinjera-seo'
import './globals.css'

const siteUrl = getSiteUrl()
const DEFAULT_GOOGLE_ANALYTICS_ID = 'G-8FFS8Y1PH2'
const googleAnalyticsId =
  process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID']?.trim() || DEFAULT_GOOGLE_ANALYTICS_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Balinjera | מסעדת באלינג׳רה',
  description:
    'מסעדת באלינג׳רה בתל אביב עם מטבח אתיופי מסורתי, אינג׳רה טרייה ומנות צבעוניות. Traditional Ethiopian cuisine in Tel Aviv.',
  icons: {
    icon: '/balinjera/favicon.png',
    apple: '/balinjera/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'YA_jjypnYMrW-7_dEloIyxEiDYojV9MMWWiGNfUu4nI',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const lang = headersList.get('x-lang') ?? 'he'
  const dir = lang === 'en' ? 'ltr' : 'rtl'

  return (
    <html lang={lang} dir={dir}>
      <body className="antialiased">
        {children}
        <Analytics />
        {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
      </body>
    </html>
  )
}
