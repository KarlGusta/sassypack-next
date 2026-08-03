import localFont from "next/font/local";


import { Suspense } from "react";
import "./globals.css";
import "aos/dist/aos.css";
import SiteChrome from "@/components/layout/SiteChrome";
import Analytics from "@/components/layout/Analytics";
import { PersonJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import { author } from "@/data/author";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque.ttf",
  variable: "--font-bricolage",
  display: "swap",
});


export const metadata = {
  metadataBase: new URL("https://sassypack.collabtower.com"),
  title: "SassyPack — Ship Faster. Earn Sooner.",
  description:
    "Launch your SaaS in hours with SassyPack. Pre-built authentication, payments, dashboards, and APIs for Next.js. Built by Karl Esi.",
  authors: [{ name: author.name, url: author.url }],
  creator: author.name,
  publisher: "SassyPack",
  openGraph: {
    title: "SassyPack — Ship Faster. Earn Sooner.",
    description:
      "Pre-built auth, payments, dashboards, and APIs for Next.js. Launch your SaaS in hours, not months. Built by Karl Esi.",
    url: "https://sassypack.collabtower.com",
    siteName: "SassyPack",
    images: [
      {
        url: "/sassypack-og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SassyPack — Ship Faster. Earn Sooner.",
    description:
      "Pre-built auth, payments, dashboards, and APIs for Next.js. Built by Karl Esi.",
    images: ["/sassypack-og.png"],
    creator: "@thekarlesi",
    site: "@UseSassyPack",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <head>
        <PersonJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}><Analytics /></Suspense>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
