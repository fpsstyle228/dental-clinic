import Link from "next/link";
import type { Metadata } from "next";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

// Dark gradient backgrounds simulating darkened photo overlays.
// Swap any value with a real photo: "url('/images/svc-1.jpg') center/cover no-repeat"
const SERVICE_BG = [
  "linear-gradient(150deg, #1c1713 0%, #2c2018 100%)",
  "linear-gradient(150deg, #101b12 0%, #1a2e1d 100%)",
  "linear-gradient(150deg, #0f1420 0%, #192135 100%)",
  "linear-gradient(150deg, #1a0f14 0%, #2e1820 100%)",
  "linear-gradient(150deg, #1c1208 0%, #2e2010 100%)",
  "linear-gradient(150deg, #0d1518 0%, #16252f 100%)",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["home", "common"]);
  const t = makeT(dicts);
  return {
    title: t("home:meta_title"),
    description: t("home:meta_description"),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["home", "common", "services"]);
  const t = makeT(dicts);

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="border-b border-gray-100 py-24 md:py-36">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-3xl">
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

      {/* ── Services ── */}
      <section>
        {/* Section header */}
        <div className="max-w-container mx-auto px-6 pt-16 pb-12">
          <p className="text-[#b19172] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            {t("home:services_eyebrow")}
          </p>
          <h2 className="text-3xl font-bold text-black mb-4">{t("home:popular_services")}</h2>
          <div className="w-8 h-[2px] bg-[#b19172]"></div>
        </div>

        {/* One service per full-width row, alternating image side */}
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className="relative h-[800px] overflow-hidden mx-auto max-w-container">
              {/* Photo / gradient — full card background */}
              <div
                className="absolute inset-0"
                style={{ background: SERVICE_BG[i - 1] }}
                aria-hidden="true"
              />

              {/* Text side — white panel, half width, left for odd / right for even */}
              <div className={`absolute inset-y-0 w-full md:w-1/2 bg-transparent flex items-center overflow-hidden ${isEven ? "right-0" : "left-0"}`}>
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
            </div>
          );
        })}
      </section>

    </div>
  );
}
