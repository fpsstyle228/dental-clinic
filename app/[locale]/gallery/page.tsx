import type { Metadata } from "next";
import Image from "next/image";
import { loadTranslations, makeT } from "@/lib/i18n.server";
import type { Locale } from "@/lib/i18n.server";

const sampleImages = [
  { src: 'https://images.unsplash.com/photo-1588771930290-0e12a2a2fd80?q=80&w=1200&auto=format&fit=crop', alt: 'Clinic interior' },
  { src: 'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1200&auto=format&fit=crop', alt: 'Dental chair' },
  { src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1200&auto=format&fit=crop', alt: 'Dentist tools' },
  { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267f2?q=80&w=1200&auto=format&fit=crop', alt: 'Smile' },
];

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dicts = await loadTranslations(params.locale, ["gallery"]);
  const t = makeT(dicts);
  return {
    title: t("gallery:meta_title"),
    description: t("gallery:meta_description"),
  };
}

export default async function GalleryPage({ params }: { params: { locale: Locale } }) {
  const dicts = await loadTranslations(params.locale, ["gallery"]);
  const t = makeT(dicts);
  return (
    <div className="max-w-container mx-auto px-4 pt-6 pb-10">
      <h1 className="text-3xl font-bold mb-3">{t("gallery:headline")}</h1>
      <p className="leading-7 text-gray-800">{t("gallery:intro")}</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {sampleImages.map((img, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-white shadow-card">
            <Image src={img.src} alt={img.alt} width={600} height={400} className="rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
