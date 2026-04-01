import type { Metadata } from "next";
import Link from "next/link";
import ContactsForm from "@/components/contactsForm";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const {locale} = await params
  const dicts = await loadTranslations(locale, ["contacts"]);
  const t = makeT(dicts);
  return {
    title: t("contacts:meta_title"),
    description: t("contacts:meta_description"),
  };
}

export default async function ContactsPage({ params }: { params: { locale: Locale } }) {
  const {locale} = await params
  const dicts = await loadTranslations(locale, ["contacts", "common"]);
  const t = makeT(dicts);

  const address = `${t('common:address_street')}, ${t('common:address_city')}`;
  const mapQuery = encodeURIComponent(address);

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-9 md:py-12">
        <div className="max-w-container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">{t('contacts:headline')}</h1>
          <p className="leading-7 text-gray-800">{t('contacts:intro')}</p>
          <p className="mt-3">
            <Link
              className="inline-block bg-brand text-white rounded-md px-4 py-2 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 shadow-sm transition"
              href={`tel:${t('common:phone_raw')}`}
            >
              {t('common:phone')}
            </Link>
          </p>
        </div>
      </section>

      {/* Key contact info cards */}
      <section>
        <div className="max-w-container mx-auto px-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
              <h3 className="mt-0 font-semibold text-lg">{t('contacts:phone')}</h3>
              <p className="leading-7 text-gray-800">
                <a className="text-brand hover:underline" href={`tel:${t('common:phone_raw')}`}>{t('common:phone')}</a>
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
              <h3 className="mt-0 font-semibold text-lg">{t('contacts:email')}</h3>
              <p className="leading-7 text-gray-800">
                <a className="text-brand hover:underline" href={`mailto:${t('common:email')}`}>{t('common:email')}</a>
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
              <h3 className="mt-0 font-semibold text-lg">{t('contacts:address')}</h3>
              <p className="leading-7 text-gray-800 mb-2">{address}</p>
              <p className="leading-7 text-muted mt-0">
                <strong>{t('contacts:hours')}:</strong> {t('common:hours')}
              </p>
              <p className="mt-3">
                <Link
                  className="inline-block bg-brand text-white rounded-md px-4 py-2 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 shadow-sm transition"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                >
                  {t('contacts:view_on_map')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map and contact form */}
      <section className="py-7">
        <div className="max-w-container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
            <div>
              <iframe
                title={t('contacts:map_title')}
                className="w-full h-[420px] rounded-xl border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              />
            </div>
            <div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
                <h3 className="mt-0 font-semibold text-lg">{t('contacts:send_message')}</h3>
                <ContactsForm
                  nameLabel={t('contacts:name')}
                  emailLabel={t('contacts:email')}
                  messageLabel={t('contacts:message')}
                  sendLabel={t('contacts:send')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
