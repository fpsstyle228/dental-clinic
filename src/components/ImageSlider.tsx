"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  order: number;
}

export default function ImageSlider({ images, order }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const canBack = index > 0;
  const canForward = index < images.length - 1;

  const slide = (dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next > images.length - 1) return;
    setIndex(next);
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? el.offsetWidth;
    el.scrollTo({ left: next * slideWidth, behavior: "smooth" });
  };

  const lbPrev = () => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i));
  const lbNext = () => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-full aspect-[4/3] relative cursor-zoom-in"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={src}
                alt={`Service example ${order}, photo ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            {canBack && (
              <button
                onClick={() => slide(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 flex items-center justify-center text-2xl font-light hover:bg-white transition-colors"
              >
                ‹
              </button>
            )}
            {canForward && (
              <button
                onClick={() => slide(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 flex items-center justify-center text-2xl font-light hover:bg-white transition-colors"
              >
                ›
              </button>
            )}
          </>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center m-0"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={`Service example ${order}, photo ${lightbox + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-xl transition-colors"
          >
            ✕
          </button>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-3xl font-light transition-colors"
            >
              ‹
            </button>
          )}

          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-3xl font-light transition-colors"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
