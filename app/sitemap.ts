import type { MetadataRoute } from "next";
import { supportedLocales } from "@/lib/i18n.server";

const LAST_MODIFIED = new Date("2025-01-01");

const ROUTE_PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/services": 0.9,
  "/gallery": 0.7,
  "/contacts": 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const routes = Object.keys(ROUTE_PRIORITY);
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of supportedLocales) {
    for (const route of routes) {
      const locSegment = loc === "en" ? "" : `/${loc}`;
      const routeSegment = route === "/" ? "" : route;
      entries.push({
        url: `${baseUrl}${locSegment}${routeSegment}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: ROUTE_PRIORITY[route],
      });
    }
  }

  return entries;
}
