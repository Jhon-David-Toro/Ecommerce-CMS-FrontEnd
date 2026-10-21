import type { FC } from "react";

import { FooterSection } from "@/components/patterns/FooterSection";
import { FOOTER_COLUMNS } from "@/lib/site/footer.constants";

import { FooterBottom } from "./parts/FooterBottom";
import { FooterBrand } from "./parts/FooterBrand";
import styles from "./Footer.module.scss";

/**
 * Footer: brand column, link columns, copyright and accepted payment methods.
 *
 * @returns The page footer.
 */
export const Footer: FC = () => (
  <footer className={styles.footer} role="contentinfo">
    <div className={styles.footer__container}>
      <FooterBrand />
      {FOOTER_COLUMNS.map((column) => (
        <FooterSection key={column.title} section={column} />
      ))}
    </div>
    <FooterBottom />
  </footer>
);
