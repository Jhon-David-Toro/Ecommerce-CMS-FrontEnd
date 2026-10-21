import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SITE_DESCRIPTION, SITE_TITLE } from "./layout.constants";
import { poppins } from "./layout.fonts";
import "./styles.scss";

export const metadata: Metadata = {
  title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
  description: SITE_DESCRIPTION,
};

/**
 * Root layout of the site: the HTML document shared by the storefront and the admin panel.
 *
 * @param props Component props.
 * @param props.children Page content.
 * @returns The HTML document.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
