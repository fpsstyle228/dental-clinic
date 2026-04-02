import type { Metadata } from "next";
import Link from "next/link";
import ContactsForm from "@/components/contactsForm";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["contacts"]);
  const t = makeT(dicts);
  return {
    title: t("contacts:meta_title"),
    description: t("contacts:meta_description"),
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dicts = await loadTranslations(locale, ["contacts"]);
  const t = makeT(dicts);

  const mapQuery = encodeURIComponent(t("contacts:address_value"));

  return (
    <div className="max-w-container mx-auto px-4 pt-8 pb-16">
      {/* Heading */}
      <h1 className="text-7xl font-black uppercase tracking-tight leading-none text-center mb-10">
        {t("contacts:headline")}
      </h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left column: map + form */}
        <div className="flex flex-col gap-8">
          {/* Map */}
          <iframe
            title={t("contacts:map_title")}
            className="w-full h-[360px] border border-gray-200 rounded-xl"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          />

          {/* Appointment form */}
          <div>
            <p className="text-sm text-gray-400 mb-4">{t("contacts:book_appointment")}</p>
            <div className="border border-gray-200 rounded-xl p-6">
              <ContactsForm
                nameLabel={t("contacts:your_name")}
                bookLabel={t("contacts:book_button")}
              />
            </div>
          </div>
        </div>

        {/* Right column: contact details + CTA + social */}
        <div className="flex flex-col gap-7">

          {/* PHONE */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{t("contacts:phone")}</p>
              <a href={`tel:${t("contacts:phone_raw")}`} className="text-sm text-gray-700 hover:text-black block">
                {t("contacts:phone_number")}
              </a>
              <p className="text-sm text-gray-500 mt-2">{t("contacts:wa_viber")}</p>
              <a href={`tel:${t("contacts:phone_raw")}`} className="text-sm text-gray-700 hover:text-black block">
                {t("contacts:phone_number")}
              </a>
            </div>
          </div>

          {/* E-MAIL */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{t("contacts:email")}</p>
              <a href={`mailto:${t("contacts:email_value")}`} className="text-sm text-gray-700 hover:text-black">
                {t("contacts:email_value")}
              </a>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{t("contacts:address")}</p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                className="text-sm text-gray-700 hover:text-black"
              >
                {t("contacts:address_value")}
              </Link>
            </div>
          </div>

          {/* WORK HOURS */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{t("contacts:hours")}</p>
              <p className="text-sm text-gray-700">{t("contacts:hours_value")}</p>
            </div>
          </div>

          {/* Call me button */}
          <div className="mt-2">
            <Link
              href={`tel:${t("contacts:phone_raw")}`}
              className="inline-block border border-[var(--color-brand)] text-[var(--color-brand)] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-brand)] hover:text-white transition-colors"
            >
              {t("contacts:call_me")}
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 mt-auto pt-4">
            <a href="#" aria-label="Instagram" className="text-[var(--color-brand)] hover:opacity-75 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <rect x="7" y="7" width="10" height="10" rx="2.5" ry="2.5" />
                <circle cx="12" cy="12" r="2.5" />
                <line x1="16.5" y1="7.5" x2="16.5" y2="7.5" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-[var(--color-brand)] hover:opacity-75 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-[var(--color-brand)] hover:opacity-75 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="M15 8h-1.5A1.5 1.5 0 0 0 12 9.5V11h3l-.5 3H12v7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
