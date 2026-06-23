import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import './globals.css'

const DEFAULT_SITE_URL = 'https://balinjera.vercel.app'

const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] ?? DEFAULT_SITE_URL

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
