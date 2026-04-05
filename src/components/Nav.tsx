"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavProps = {
  locale: string;
  locales: { code: string; label: string }[];
  brand: string;
  clinicShortName: string;
  footerTagline: string;
  sidebarDesc: string;
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

function BurgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <line x1="0" y1="1" x2="18" y2="1" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="7" x2="18" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="13" x2="18" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav({
  locale,
  locales,
  brand,
  clinicShortName,
  footerTagline,
  sidebarDesc,
  navHome,
  navServices,
  navGallery,
  navContacts,
  phone,
  phoneRaw,
}: NavProps) {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  const stablePathname = mounted ? pathname : "/";

  const getLocaleHref = (targetLocale: string) => {
    const segments = stablePathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  };

  return (
    <>
      {/* ── Desktop header ── */}
      <header className="hidden md:block sticky top-0 z-50">
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
                      className={l.code === locale ? "text-[#b19172]" : "text-gray-500 hover:text-[#b19172] transition-colors"}
                    >
                      {l.label}
                    </Link>
                  </span>
                ))}
              </div>
              <a href={`tel:${phoneRaw}`} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#b19172] transition-colors">
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
              <span className="text-2xl font-bold tracking-widest text-gray-900 uppercase">{brand}</span>
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
                        className={["text-sm font-semibold uppercase tracking-[0.08em] transition-colors", active ? "text-[#b19172]" : "text-gray-900 hover:text-[#b19172]"].join(" ")}
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

      {/* ── Mobile burger button (fixed, always visible on mobile) ── */}
      <button
        className="fixed top-4 right-4 z-40 md:hidden w-11 h-11 rounded-full bg-black/60 flex items-center justify-center"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open menu"
      >
        <BurgerIcon />
      </button>

      {/* ── Mobile sidebar ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 md:hidden bg-white flex flex-col w-[300px] transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-5 text-gray-700 hover:text-black"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col h-full px-8 py-10 overflow-y-auto">
          {/* Decorative dots */}
          <div className="grid grid-cols-3 gap-1.5 w-fit mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
            ))}
          </div>

          {/* Logo */}
          <div className="mb-8">
            <span className="block text-3xl font-black uppercase tracking-[0.3em] leading-none">
              {clinicShortName}
            </span>
            <span className="block text-xs uppercase tracking-[0.4em] text-gray-400 mt-1">
              {footerTagline}
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-4 mb-auto">
            {links.map((l) => {
              const active = isActive(stablePathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`text-lg font-bold uppercase tracking-[0.08em] transition-colors ${active ? "text-[var(--color-brand)]" : "text-black hover:text-[var(--color-brand)]"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Description + phone */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-[var(--color-brand)] leading-relaxed mb-4">
              {sidebarDesc}
            </p>
            <a href={`tel:${phoneRaw}`} className="text-base font-semibold text-black hover:text-[var(--color-brand)] transition-colors">
              {phone}
            </a>
          </div>

          {/* Locale switcher */}
          <div className="flex gap-3 mt-6">
            {locales.map((l) => (
              <Link
                key={l.code}
                href={getLocaleHref(l.code)}
                onClick={() => setIsSidebarOpen(false)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${l.code === locale ? "text-[var(--color-brand)]" : "text-gray-400 hover:text-black"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
