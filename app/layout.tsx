import type { Metadata } from "next";
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic"),
  title: {
    default: "Kazo Dental Clinic — Caring Smiles",
    template: "%s | Kazo Dental Clinic",
  },
  description: "Modern dental clinic offering preventive, cosmetic and surgical dentistry. Book your appointment today!",
  openGraph: {
    type: "website",
    siteName: "Kazo Dental Clinic",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
