import type { Metadata } from "next";
import { loadTranslations, makeT, supportedLocales } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";
import GalleryClient from "@/components/GalleryClient";
import fs from "fs";
import path from "path";

const OG_LOCALE: Record<string, string> = {
  en: "en_US", uk: "uk_UA", de: "de_DE", es: "es_ES",
};

export const dynamic = "force-static";

function getSliders(): { order: number; images: string[] }[] {
  const baseDir = path.join(process.cwd(), "public", "images", "service-examples");

  let entries: string[];
  try {
    entries = fs.readdirSync(baseDir);
  } catch {
    return [];
  }

  const dirs = entries
    .filter((e) => {
      const full = path.join(baseDir, e);
      return fs.statSync(full).isDirectory() && !isNaN(Number(e));
    })
    .sort((a, b) => Number(a) - Number(b));

  return dirs.map((dir) => {
    const dirPath = path.join(baseDir, dir);
    const files = fs
      .readdirSync(dirPath)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort();

    return {
      order: Number(dir),
      images: files.map((f) => `/images/service-examples/${dir}/${f}`),
    };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["gallery"]);
  const t = makeT(dicts);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const locPath = locale === "en" ? "" : `/${locale}`;
  const canonical = `${baseUrl}${locPath}/gallery`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/gallery` };
  for (const loc of supportedLocales) {
    const p = loc === "en" ? "" : `/${loc}`;
    languages[loc] = `${baseUrl}${p}/gallery`;
  }

  return {
    title: t("gallery:meta_title"),
    description: t("gallery:meta_description"),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("gallery:meta_title"),
      description: t("gallery:meta_description"),
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [
        {
          url: `${baseUrl}/images/main-page/hero.jpg`,
          width: 1200,
          height: 800,
          alt: t("gallery:headline"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("gallery:meta_title"),
      description: t("gallery:meta_description"),
      images: [`${baseUrl}/images/main-page/hero.jpg`],
    },
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["gallery"]);
  const t = makeT(dicts);
  const sliders = getSliders();

  return (
    <div className="max-w-container mx-auto px-4 pt-8 pb-16">
      <div className="flex justify-start">
        <h1 className="text-4xl font-black uppercase tracking-tight leading-none md:text-7xl">
          {t("gallery:headline")}
        </h1>
      </div>
      <GalleryClient sliders={sliders} subtitle={t("gallery:subtitle")} />
    </div>
  );
}
