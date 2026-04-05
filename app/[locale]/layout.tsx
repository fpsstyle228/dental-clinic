import type { Metadata } from "next";
import { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["common", "contacts"]);
  const t = makeT(dicts);

  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr_auto]">
      <Nav
        locale={locale}
        locales={supportedLocales.map((code) => ({ code, label: localeLabelMap[code] ?? code.toUpperCase() }))}
        brand={t("common:clinic_name")}
        clinicShortName={t("common:clinic_short_name")}
        footerTagline={t("common:footer_tagline")}
        sidebarDesc={t("common:sidebar_desc")}
        navHome={t("common:nav_home")}
        navServices={t("common:nav_services")}
        navGallery={t("common:nav_gallery")}
        navContacts={t("common:nav_contacts")}
        phone={t("contacts:phone_number")}
        phoneRaw={t("contacts:phone_raw")}
      />
      <main>{children}</main>
      <Footer
        clinicShortName={t("common:clinic_short_name")}
        footerTagline={t("common:footer_tagline")}
        copyright={t("common:footer_copyright")}
        mailLabel={t("common:footer_mail")}
        callLabel={t("common:footer_call_us")}
        locationLabel={t("common:footer_location")}
        email={t("contacts:email_value")}
        phone={t("contacts:phone_number")}
        phoneRaw={t("contacts:phone_raw")}
        address={t("contacts:address_value")}
      />
    </div>
  );
}
