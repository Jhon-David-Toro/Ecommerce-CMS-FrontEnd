import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";

import { Banner } from "@/components/sections/Banner";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

/**
 * Page chrome: promotion banner, navigation, main content, footer and analytics.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The page body.
 */
export const LayoutBody = ({ children }: { children: ReactNode }) => (
  <>
    <Banner />
    <Navbar />
    <main>{children}</main>
    <Footer />
    <SpeedInsights />
    <Analytics />
  </>
);

/**
 * Layout of the storefront pages.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The storefront chrome around the page.
 */
export default function StorefrontLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <LayoutBody>{children}</LayoutBody>;
}
