"use client";

import type { FC } from "react";

import { FooterSection } from "@/components/patterns/FooterSection";
import { NewsletterForm } from "@/components/patterns/NewsletterForm";
import { useSiteContent } from "@/lib/content/useSiteContent";

import { FooterBottom } from "./parts/FooterBottom";
import { FooterBrand } from "./parts/FooterBrand";
import styles from "./Footer.module.scss";

/**
 * Footer: brand column, link columns, copyright and accepted payment methods, with texts and links editable from the admin panel.
 *
 * @returns The page footer.
 */
export const Footer: FC = () => {
  const { footerTagline, footerColumns } = useSiteContent();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__container}>
        <FooterBrand tagline={footerTagline} />
        {footerColumns.map((column) => (
          <FooterSection key={column.title} section={column} />
        ))}
      </div>
      <NewsletterForm />
      <FooterBottom />
    </footer>
  );
};
