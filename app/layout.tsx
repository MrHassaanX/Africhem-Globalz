import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { FirstVisitLoader } from "@/components/motion/FirstVisitLoader";
import { createPageMetadata } from "@/lib/seo/metadata";
import { themeBootstrap } from "@/lib/theme";
import "./globals.css";

const dmSans = localFont({
  src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-dm-sans",
  weight: "100 1000",
});

// Runs before hydration. A timeout also removes the overlay if React fails to mount.
const loaderBootstrap = `
try {
  const key = "africhem-loader-seen-v2";
  if (location.pathname !== "/" && !sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, "1");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.africhemLoaderStartedAt = String(Date.now());
      document.documentElement.dataset.africhemLoader = "show";
      setTimeout(() => {
        delete document.documentElement.dataset.africhemLoader;
        delete document.documentElement.dataset.africhemLoaderStartedAt;
      }, 4200);
    }
  }
} catch {
  // Storage denial leaves the site directly accessible.
}
`;

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Africhem Globalz | Chemical Trading & Distribution",
    description:
      "Africhem Globalz — chemical sourcing, trading and distribution. Our new website is under construction.",
    path: "/",
  }),
  applicationName: "Africhem Globalz",
  robots: {
    index: true,
    follow: true,
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
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script id="africhem-theme" dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        {children}
        <FirstVisitLoader />
        <Script id="africhem-first-visit" strategy="beforeInteractive">
          {loaderBootstrap}
        </Script>
      </body>
    </html>
  );
}
