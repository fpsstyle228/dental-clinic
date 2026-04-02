import type { Metadata } from "next";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";
import GalleryClient from "@/components/GalleryClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["gallery"]);
  const t = makeT(dicts);
  return {
    title: t("gallery:meta_title"),
    description: t("gallery:meta_description"),
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["gallery"]);
  const t = makeT(dicts);

  return (
    <div className="max-w-container mx-auto px-4 pt-8 pb-16">
      <div className="flex justify-end">
        <h1 className="text-7xl font-black uppercase tracking-tight leading-none">
          {t("gallery:headline")}
        </h1>
      </div>
      <GalleryClient
        labels={{
          subtitle: t("gallery:subtitle"),
          pick_category: t("gallery:pick_category"),
          cat_veneers: t("gallery:cat_veneers"),
          cat_whitening: t("gallery:cat_whitening"),
        }}
      />
    </div>
  );
}
