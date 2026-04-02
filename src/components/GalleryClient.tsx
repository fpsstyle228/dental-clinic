"use client";

import { useState } from "react";
import Image from "next/image";

type Category = "veneers" | "whitening";

interface Labels {
  subtitle: string;
  pick_category: string;
  cat_veneers: string;
  cat_whitening: string;
}

const images: Record<Category, { src: string; alt: string }[]> = {
  veneers: [
    { src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&auto=format&fit=crop", alt: "Ceramic veneers result" },
    { src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267f2?w=800&auto=format&fit=crop", alt: "Smile after veneers" },
    { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop", alt: "Before and after veneers" },
    { src: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800&auto=format&fit=crop", alt: "Dental restoration close-up" },
    { src: "https://images.unsplash.com/photo-1585004607750-272bc4f9be14?w=800&auto=format&fit=crop", alt: "Dental clinic procedure" },
    { src: "https://images.unsplash.com/photo-1516542076529-1ea3854896e1?w=800&auto=format&fit=crop", alt: "Dental chair" },
    { src: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=800&auto=format&fit=crop", alt: "Dentist at work" },
    { src: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&auto=format&fit=crop", alt: "Dental equipment" },
    { src: "https://images.unsplash.com/photo-1588771930290-0e12a2a2fd80?w=800&auto=format&fit=crop", alt: "Clinic interior" },
  ],
  whitening: [
    { src: "https://images.unsplash.com/photo-1529636789372-e58b45c4d7a4?w=800&auto=format&fit=crop", alt: "Bright smile after whitening" },
    { src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&auto=format&fit=crop", alt: "Whitening result" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop", alt: "Happy smile" },
    { src: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=800&auto=format&fit=crop", alt: "Whitening procedure" },
    { src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop", alt: "Dental whitening" },
    { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop", alt: "Smile close-up" },
    { src: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&auto=format&fit=crop", alt: "Before and after whitening" },
    { src: "https://images.unsplash.com/photo-1559083991-9c3e61430eee?w=800&auto=format&fit=crop", alt: "Teeth close-up" },
    { src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&auto=format&fit=crop", alt: "White teeth result" },
  ],
};

// Bento grid pattern: 2 = row-span-2 (tall), 1 = normal height
// Layout per 9 images:
// [0 tall] [1]      [2 tall]
//          [3]
// [4]      [5 tall] [6]
// [7]               [8]
const ROW_SPANS = [2, 1, 2, 1, 1, 2, 1, 1, 1];

export default function GalleryClient({ labels }: { labels: Labels }) {
  const [active, setActive] = useState<Category>("veneers");

  return (
    <>
      <p className="text-sm text-[var(--color-brand)] text-right mt-1">
        {labels.subtitle}
      </p>

      {/* Category selector */}
      <div className="mt-10 mb-6">
        <p className="font-bold text-lg mb-4">{labels.pick_category}</p>
        <div className="flex">
          {(["veneers", "whitening"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                active === cat
                  ? "bg-[var(--color-brand)] text-white"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {cat === "veneers" ? labels.cat_veneers : labels.cat_whitening}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-3 gap-1 auto-rows-[180px]">
        {images[active].map((img, i) => (
          <div
            key={`${active}-${i}`}
            className={`overflow-hidden ${ROW_SPANS[i] === 2 ? "row-span-2" : ""}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={ROW_SPANS[i] === 2 ? 800 : 400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
