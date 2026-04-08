import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { loadTranslations, makeT, supportedLocales } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

export const dynamic = "force-static";

const OG_LOCALE: Record<string, string> = {
  en: "en_US", uk: "uk_UA", de: "de_DE", es: "es_ES",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["services"]);
  const t = makeT(dicts);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const locPath = locale === "en" ? "" : `/${locale}`;
  const canonical = `${baseUrl}${locPath}/services`;

  const languages: Record<string, string> = { "x-default": `${baseUrl}/services` };
  for (const loc of supportedLocales) {
    const p = loc === "en" ? "" : `/${loc}`;
    languages[loc] = `${baseUrl}${p}/services`;
  }

  return {
    title: t("services:meta_title"),
    description: t("services:meta_description"),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("services:meta_title"),
      description: t("services:meta_description"),
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [
        {
          url: `${baseUrl}/images/main-page/DOCTOR_CONSULTATION.jpg`,
          width: 1200,
          height: 800,
          alt: t("services:headline"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("services:meta_title"),
      description: t("services:meta_description"),
      images: [`${baseUrl}/images/main-page/DOCTOR_CONSULTATION.jpg`],
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["services"]);
  const t = makeT(dicts);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const locPath = locale === "en" ? "" : `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("services:meta_title"),
    url: `${baseUrl}${locPath}/services`,
    itemListElement: [1, 2, 3, 4, 5, 6].map((i) => ({
      "@type": "ListItem",
      position: i,
      item: {
        "@type": "Service",
        name: t(`services:item_${i}_title`),
        description: t(`services:item_${i}_desc`),
        offers: {
          "@type": "Offer",
          price: t(`services:item_${i}_price`),
          priceCurrency: "EUR",
        },
      },
    })),
  };

  return (
    <div className="max-w-container mx-auto px-4 pt-8 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 md:items-start md:justify-between md:gap-8">
          <h1 className="text-4xl font-black uppercase tracking-tight leading-none md:text-7xl">
              {t("services:headline")}
          </h1>
        <p className="text-sm text-[var(--color-brand)] max-w-xs leading-relaxed md:mt-2">
          {t("services:intro")}
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex mb-12">
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
          <div key={i} className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-5">
                  <span className="text-gray-400 text-sm font-light w-6 flex-shrink-0 pt-1 hidden md:block">
              {String(i).padStart(2, "0")}
            </span>
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0">
                    <Image
                        width={90}
                        height={90}
                      src={`/images/services-logo/${i}.jpg`}
                      alt={`Service ${i}`}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                      <h3 className="font-black text-lg uppercase mb-1">
                          {t(`services:item_${i}_title`)}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed hidden md:block">
                          {t(`services:item_${i}_desc`)}
                      </p>
                  </div>
                  <div className="text-[var(--color-brand)] font-bold text-xl flex-shrink-0 text-right min-w-[6rem]">
                      {t(`services:item_${i}_price`)}
                  </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed md:hidden mt-2">
                  {t(`services:item_${i}_desc`)}
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}
