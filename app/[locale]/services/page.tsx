import type { Metadata } from "next";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dicts = await loadTranslations(params.locale, ["services"]);
  const t = makeT(dicts);
  return {
    title: t("services:meta_title"),
    description: t("services:meta_description"),
  };
}

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dicts = await loadTranslations(params.locale, ["services"]);
  const t = makeT(dicts);

  return (
    <div className="max-w-container mx-auto px-4 pt-6 pb-10">
      <h1 className="text-3xl font-bold mb-3">{t("services:headline")}</h1>
      <p className="leading-7 text-gray-800">{t("services:intro")}</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
            <h3 className="font-semibold text-lg">{t(`services:item_${i}_title`)}</h3>
            <p className="leading-7 text-gray-800">{t(`services:item_${i}_desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
