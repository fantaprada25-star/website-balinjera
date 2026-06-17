import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Projet autonome : ancre le tracing à ce dossier (évite de remonter sur un
  // éventuel lockfile parent). Balinjera n'utilise que des images locales
  // (public/balinjera/*), donc pas de remotePatterns.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
