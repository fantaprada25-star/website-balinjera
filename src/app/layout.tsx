import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const DEFAULT_SITE_URL = "https://balinjera.vercel.app";

const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"] ?? DEFAULT_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Balinjera | מסעדת באלינג׳רה",
  description:
    "מסעדת באלינג׳רה בתל אביב עם מטבח אתיופי מסורתי, אינג׳רה טרייה ומנות צבעוניות. Traditional Ethiopian cuisine in Tel Aviv.",
  icons: {
    icon: "/balinjera/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
