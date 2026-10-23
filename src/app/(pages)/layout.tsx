import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";

import { Banner } from "@/components/sections/Banner";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

import styles from "./layout.module.scss";

/**
 * Page chrome: promotion banner, navigation, main content, footer and analytics, with the footer kept at the bottom of short pages.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The page body.
 */
export const LayoutBody = ({ children }: { children: ReactNode }) => (
  <div className={styles.page}>
    <Banner />
    <Navbar />
    <main className={styles.main}>{children}</main>
    <Footer />
    <SpeedInsights />
    <Analytics />
  </div>
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
