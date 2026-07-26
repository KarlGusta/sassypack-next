"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// Routes that render full-screen, without the marketing header/footer.
const BARE_ROUTES = ["/live-demo"];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isBare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
