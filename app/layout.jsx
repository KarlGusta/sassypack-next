import { Suspense } from "react";
import "./globals.css";
import "aos/dist/aos.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Analytics from "@/components/layout/Analytics";

export const metadata = {
  title: "Next.js starter kit & Next.js SaaS Starter Kit",
  description:
    "Launch your SaaS in hours with SassyPack. Pre-built authentication, payments, dashboards, and APIs for MERN and Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}><Analytics /></Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
