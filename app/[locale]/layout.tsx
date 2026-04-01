import type { Metadata } from "next";
import { ReactNode } from "react";
import Nav from "@/components/Nav";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import { supportedLocales, type Locale } from "@/lib/i18n.server";

const localeLabelMap: Record<string, string> = {
  en: "Eng",
  es: "Esp",
  uk: "Ukr",
  de: "Deu",
};

export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["common"]);
  const t = makeT(dicts);

  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <Nav
        locale={locale}
        locales={supportedLocales.map((code) => ({ code, label: localeLabelMap[code] ?? code.toUpperCase() }))}
        brand={t("common:clinic_name")}
        navHome={t("common:nav_home")}
        navServices={t("common:nav_services")}
        navGallery={t("common:nav_gallery")}
        navContacts={t("common:nav_contacts")}
        phone={t("common:phone")}
        phoneRaw={t("common:phone_raw")}
      />
      <main>{children}</main>
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs font-bold text-black uppercase tracking-[0.2em]">
            {t("common:clinic_name")}
          </span>
          <span className="text-xs text-[#919191]">
            © {new Date().getFullYear()} {t("common:clinic_name")}. {t("common:all_rights_reserved")}
          </span>
        </div>
      </footer>
    </div>
  );
}
