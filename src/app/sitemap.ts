import type { MetadataRoute } from "next";

import { getBlogPostSlugs } from "./balinjera-content";

const DEFAULT_SITE_URL = "https://balinjera.vercel.app";

function getSiteUrl() {
  return process.env["NEXT_PUBLIC_SITE_URL"] ?? DEFAULT_SITE_URL;
}

function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/menu",
    "/events",
    "/blog",
    "/accessibility",
  ];
  const articleRoutes = getBlogPostSlugs().map((slug) => `/blog/${slug}`);

  return [...staticRoutes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly",
    priority: route === "/" ? 0.8 : 0.6,
  }));
}
