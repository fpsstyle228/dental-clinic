import { supportedLocales } from "@/lib/i18n.server";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const routes = ["/", "/services", "/gallery", "/contacts"];
  const entries = [] as { url: string; changeFrequency: "always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never"; priority: number }[];

  for (const loc of supportedLocales) {
    for (const r of routes) {
      const path = loc === "en" ? r : `/${loc}${r === "/" ? "" : r}`;
      entries.push({ url: `${baseUrl}${path}`, changeFrequency: "weekly", priority: 0.8 });
    }
  }

  return entries;
}
