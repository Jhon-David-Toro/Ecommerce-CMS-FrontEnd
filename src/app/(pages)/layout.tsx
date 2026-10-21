import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Banner } from "@/components/sections/Banner";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";

import { SITE_DESCRIPTION, SITE_TITLE } from "./layout.constants";
import { poppins } from "./layout.fonts";
import "../styles.scss";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

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
 * Root layout of the site.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The HTML document.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LayoutBody>{children}</LayoutBody>
      </body>
    </html>
  );
}
