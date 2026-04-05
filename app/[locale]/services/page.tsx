import type { Metadata } from "next";
import Link from "next/link";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["services"]);
  const t = makeT(dicts);
  return {
    title: t("services:meta_title"),
    description: t("services:meta_description"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["services"]);
  const t = makeT(dicts);

  return (
    <div className="max-w-container mx-auto px-4 pt-8 pb-16">
      {/* Header */}
      <div className="flex flex-col-reverse gap-4 mb-8 md:flex-row md:items-start md:justify-between md:gap-8">
        <p className="text-sm text-[var(--color-brand)] max-w-xs leading-relaxed md:mt-2">
          {t("services:intro")}
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight leading-none md:text-7xl">
          {t("services:headline")}
        </h1>
      </div>

      {/* CTA Button */}
      <div className="flex justify-end mb-12">
        <Link
          href={`/${locale}/contacts`}
          className="border border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          {t("services:book_cta")}
        </Link>
      </div>

      {/* Services list */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5 flex items-start gap-5">
            <span className="text-gray-400 text-sm font-light w-6 flex-shrink-0 pt-1">
              {String(i).padStart(2, "0")}
            </span>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg uppercase mb-1">
                {t(`services:item_${i}_title`)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`services:item_${i}_desc`)}
              </p>
            </div>
            <div className="text-[var(--color-brand)] font-bold text-xl flex-shrink-0 text-right min-w-[6rem]">
              {t(`services:item_${i}_price`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
