import type { Metadata } from "next";
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kazo.clinic"),
  title: {
    default: "Advance Dental Clinic",
    template: "%s | Individual Smile",
  },
  description: "Modern dental clinic offering preventive, cosmetic and surgical dentistry. Book your appointment today!",
  openGraph: {
    type: "website",
    siteName: "Advance Dental Clinic - Individual Smile",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
