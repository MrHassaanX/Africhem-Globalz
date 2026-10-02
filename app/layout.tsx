import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-dm-sans",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Africhem Globalz | Chemical Trading & Distribution",
  description:
    "Africhem Globalz is a chemical trading and distribution company. Our new website is under construction.",
  applicationName: "Africhem Globalz",
  openGraph: {
    type: "website",
    title: "Africhem Globalz | Chemical Trading & Distribution",
    description:
      "Africhem Globalz is a chemical trading and distribution company. Our new website is under construction.",
    siteName: "Africhem Globalz",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#092622",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
