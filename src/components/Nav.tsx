"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavProps = {
  locale: string;
  locales: { code: string; label: string }[];
  brand: string;
  navHome: string;
  navServices: string;
  navGallery: string;
  navContacts: string;
  phone: string;
  phoneRaw: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Nav({
  locale,
  locales,
  brand,
  navHome,
  navServices,
  navGallery,
  navContacts,
  phone,
  phoneRaw,
}: NavProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "/";

  const links = [
    { label: navHome, href: `/${locale}` },
    { label: navServices, href: `/${locale}/services` },
    { label: navGallery, href: `/${locale}/gallery` },
    { label: navContacts, href: `/${locale}/contacts` },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const stablePathname = mounted ? pathname : "/";

  const getLocaleHref = (targetLocale: string) => {
    const segments = stablePathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#b19172] transition-colors">
              <FacebookIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#b19172] transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-[#b19172] transition-colors">
              <YoutubeIcon />
            </a>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 text-xs font-semibold">
              {locales.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="mx-1 text-gray-300 select-none">|</span>}
                  <Link
                    href={getLocaleHref(l.code)}
                    className={
                      l.code === locale
                        ? "text-[#b19172]"
                        : "text-gray-500 hover:text-[#b19172] transition-colors"
                    }
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#b19172] transition-colors"
            >
              <PhoneIcon />
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-container mx-auto px-4 flex items-center justify-between h-[90px]">
          <Link href={`/${locale}`} aria-label={brand}>
            <span className="text-2xl font-bold tracking-widest text-gray-900 uppercase">
              {brand}
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="flex gap-8 list-none m-0 p-0">
              {links.map((l) => {
                const active = isActive(stablePathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
                        active ? "text-[#b19172]" : "text-gray-900 hover:text-[#b19172]",
                      ].join(" ")}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
