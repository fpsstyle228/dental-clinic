export type FooterProps = {
  clinicShortName: string;
  footerTagline: string;
  copyright: string;
  mailLabel: string;
  callLabel: string;
  locationLabel: string;
  email: string;
  phone: string;
  phoneRaw: string;
  address: string;
};

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="11" />
      <rect x="7" y="7" width="10" height="10" rx="2.5" ry="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <line x1="16.5" y1="7.5" x2="16.51" y2="7.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="11" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="11" />
      <path d="M15 8h-1.5A1.5 1.5 0 0 0 12 9.5V11h3l-.5 3H12v7" />
    </svg>
  );
}

export default function Footer({
  clinicShortName,
  footerTagline,
  copyright,
  mailLabel,
  callLabel,
  locationLabel,
  email,
  phone,
  phoneRaw,
  address,
}: FooterProps) {
  return (
    <footer className="border-t border-gray-200 py-8 bg-white">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-start justify-between gap-8 flex-wrap">

          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="block text-3xl font-black uppercase tracking-[0.3em] leading-none">
              {clinicShortName}
            </span>
            <span className="block text-xs uppercase tracking-[0.4em] text-gray-400 mt-1.5">
              {footerTagline}
            </span>
            <p className="text-xs text-gray-400 mt-3">{copyright}</p>
          </div>

          {/* MAIL */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><MailIcon /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{mailLabel}</p>
              <a
                href={`mailto:${email}`}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {email}
              </a>
            </div>
          </div>

          {/* CALL US */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><PhoneIcon /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{callLabel}</p>
              <a
                href={`tel:${phoneRaw}`}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><PinIcon /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1">{locationLabel}</p>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 self-center">
            <a href="#" aria-label="Instagram" className="text-[var(--color-brand)] hover:opacity-70 transition-opacity">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="YouTube" className="text-[var(--color-brand)] hover:opacity-70 transition-opacity">
              <YoutubeIcon />
            </a>
            <a href="#" aria-label="Facebook" className="text-[var(--color-brand)] hover:opacity-70 transition-opacity">
              <FacebookIcon />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
