"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.default.init({ duration: 800, once: true, easing: "ease-out-cubic" });
    });
  }, []);

  useEffect(() => {
    // TODO: wire up ReactGA.send({ hitType: "pageview", page: pathname })
    // once NEXT_PUBLIC_GA_MEASUREMENT_ID is set — see .env.local
  }, [pathname, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}
