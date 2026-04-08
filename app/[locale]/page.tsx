import Link from "next/link";
import type { Metadata } from "next";
import { loadTranslations, makeT, supportedLocales } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

const SERVICE_IMAGES = [
  "/images/main-page/DOCTOR_CONSULTATION.jpg",
  "/images/main-page/PREVENTIVE_PERIODONTAL_TREATMENT.jpg",
  "/images/main-page/TEETH_WHITENING.jpg",
  "/images/main-page/MEDICAL_SEDATION.jpg",
  "/images/main-page/CARIES_TREATMENT.jpg",
  "/images/main-page/DENTAL_IMPLANTS.jpg",
];

export const dynamic = "force-static";

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  uk: "uk_UA",
  de: "de_DE",
  es: "es_ES",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["home", "common"]);
  const t = makeT(dicts);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";
  const locPath = locale === "en" ? "" : `/${locale}`;
  const canonical = `${baseUrl}${locPath}`;

  const languages: Record<string, string> = { "x-default": baseUrl };
  for (const loc of supportedLocales) {
    languages[loc] = loc === "en" ? baseUrl : `${baseUrl}/${loc}`;
  }

  return {
    title: t("home:meta_title"),
    description: t("home:meta_description"),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t("home:meta_title"),
      description: t("home:meta_description"),
      siteName: t("common:clinic_name"),
      locale: OG_LOCALE[locale] ?? "en_US",
      images: [
        {
          url: `${baseUrl}/images/main-page/hero.jpg`,
          width: 1200,
          height: 800,
          alt: t("home:headline"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home:meta_title"),
      description: t("home:meta_description"),
      images: [`${baseUrl}/images/main-page/hero.jpg`],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["home", "common", "services", "contacts"]);
  const t = makeT(dicts);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: t("common:clinic_name"),
    description: t("home:meta_description"),
    url: baseUrl,
    telephone: t("contacts:phone_raw"),
    email: t("contacts:email_value"),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("contacts:address_value"),
    },
    openingHours: t("contacts:hours_value"),
    priceRange: "$$",
    medicalSpecialty: "Dentistry",
    availableService: [1, 2, 3, 4, 5, 6].map((i) => ({
      "@type": "MedicalTherapy",
      name: t(`services:item_${i}_title`),
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end md:items-stretch md:min-h-0 md:border-b md:border-gray-100 md:py-36">
        {/* Mobile background */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ backgroundImage: `url(/images/main-page/hero.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-container mx-auto px-6">
          {/* Mobile layout */}
          <div className="md:hidden pb-10 pt-28 bg-gradient-to-t from-black/75 via-black/40 to-transparent -mx-6 px-6">
            <p className="text-[#b19172] text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
              {t("home:eyebrow")}
            </p>
            <h1 className="text-[2.5rem] font-bold leading-tight text-white mb-2">
              {t("home:headline")}
            </h1>
            <p className="text-[1.25rem] font-bold text-[#b19172] italic leading-tight mb-4">
              {t("home:subheadline")}
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Link
                href={`/${locale}/services`}
                className="block border border-white text-center py-4 text-[11px] font-bold uppercase tracking-[0.2em]"
              >
               <span className="text-white">{t("home:consultation")}</span>
              </Link>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block max-w-3xl py-0">
            <p className="text-[#b19172] text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
              {t("home:eyebrow")}
            </p>
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-black mb-7">
              {t("home:headline")}
            </h1>
            <p className="text-[#919191] text-lg leading-relaxed mb-12 max-w-md">
              {t("home:subheadline")}
            </p>
            <div className="flex gap-4 flex-wrap items-center">
              <Link
                href="contacts"
                className="inline-block border border-black text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-[#b19172] hover:text-[#b19172] transition-colors duration-300"
              >
                {t("home:cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services section header (desktop only) ── */}
      <div className="hidden md:block max-w-container mx-auto px-6 pt-16 pb-12">
        <p className="text-[#b19172] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
          {t("home:services_eyebrow")}
        </p>
        <h2 className="text-3xl font-bold text-black mb-4">{t("home:popular_services")}</h2>
        <div className="w-8 h-[2px] bg-[#b19172]" />
      </div>

      {/* ── Services ── */}
      <section>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className="relative min-h-screen md:h-[800px] overflow-hidden md:mx-auto md:max-w-container"
            >
              {/* Background — mobile: cover, desktop: contain */}
              <div
                className="absolute inset-0 md:hidden"
                style={{ backgroundImage: `url(${SERVICE_IMAGES[i - 1]})`, backgroundSize: "cover", backgroundPosition: "center" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 hidden md:block"
                style={{ backgroundImage: `url(${SERVICE_IMAGES[i - 1]})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: isEven ? "left" : "right" }}
                aria-hidden="true"
              />
              {/* White blur overlay */}
              <div className="absolute inset-0 block bg-white/30" aria-hidden="true" />

              {/* ── Desktop: half-width text panel ── */}
              <div
                className={`hidden md:flex absolute inset-y-0 w-1/2 bg-white items-center overflow-hidden ${isEven ? "right-0" : "left-0"}`}
              >
                {/* Watermark number */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pr-6 text-[clamp(120px,13vw,220px)] font-black leading-none select-none pointer-events-none text-gray-100">
                  {String(i).padStart(2, "0")}
                </span>
                {/* Content */}
                <div className="relative z-10 px-12 lg:px-20 py-16">
                  <h3 className="text-[70px] font-bold text-black leading-[1.05]">
                    {t(`services:item_${i}_title`)}
                  </h3>
                  <p className="text-[70px] font-bold text-[#b19172] leading-[1.05] mb-8">
                    {t(`services:item_${i}_tagline`)}
                  </p>
                  <p className="text-[19px] text-gray-500 leading-relaxed mb-10 max-w-md">
                    {t(`services:item_${i}_desc`)}
                  </p>
                  <Link
                    href="services"
                    className="inline-block border border-black text-black px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:border-[#b19172] hover:text-[#b19172] transition-colors duration-300"
                  >
                    {t("common:learn_more")}
                  </Link>
                </div>
              </div>

              {/* ── Mobile: full-screen overlay at bottom ── */}
              <div className="md:hidden absolute inset-x-0 bottom-0 px-6 pb-10 pt-28 pb-20 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
                <h3 className="text-[2rem] font-bold text-white leading-tight mb-1">
                  {t(`services:item_${i}_title`)}
                </h3>
                <p className="text-[1.75rem] font-bold text-[var(--color-brand)] italic leading-tight mb-4">
                  {t(`services:item_${i}_tagline`)}
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-6 line-clamp-2">
                  {t(`services:item_${i}_desc`)}
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/${locale}/contacts`}
                    className="block border border-white  text-center py-4 text-xs font-bold uppercase tracking-widest"
                  >
                    <span className="text-white">{t("home:consultation")}</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
}
