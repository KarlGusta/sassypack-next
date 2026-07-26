import localFont from "next/font/local";


import { Suspense } from "react";
import "./globals.css";
import "aos/dist/aos.css";
import SiteChrome from "@/components/layout/SiteChrome";
import Analytics from "@/components/layout/Analytics";

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque.ttf",
  variable: "--font-bricolage",
  display: "swap",
});


export const metadata = {
  title: "SassyPack | Next.js starter kit",
  description:
    "Launch your SaaS in hours with SassyPack. Pre-built authentication, payments, dashboards, and APIs for Nextjs and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}><Analytics /></Suspense>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
