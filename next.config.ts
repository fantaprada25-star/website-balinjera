import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Projet autonome : ancre le tracing à ce dossier (évite de remonter sur un
  // éventuel lockfile parent). Balinjera n'utilise que des images locales
  // (public/balinjera/*), donc pas de remotePatterns.
  experimental: {
    cssChunking: false,
    inlineCss: true,
  },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        // Legacy WooCommerce shop URLs, still indexed from before the site
        // migrated to this Next.js app. There is no shop anymore — the menu
        // is the closest live equivalent.
        source: '/shop',
        destination: '/menu',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: '/menu',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
