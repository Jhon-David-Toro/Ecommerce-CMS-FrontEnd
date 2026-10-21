import type { FC } from "react";

import { FooterPaymentMethods } from "@/components/patterns/FooterPaymentMethods";
import { FooterSection } from "@/components/patterns/FooterSection";
import { FooterSocialIcons } from "@/components/patterns/FooterSocialIcons";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/site/footer.constants";

import { BRAND_NAME, COPYRIGHT_NAME, FIRST_YEAR, FOOTER_TAGLINE } from "./Footer.constants";
import styles from "./Footer.module.scss";

/**
 * Footer: brand column, link columns, copyright and accepted payment methods.
 *
 * @returns The page footer.
 */
export const Footer: FC = () => (
  <footer className={styles.footer} role="contentinfo">
    <div className={styles.footer__container}>
      <section className={styles.footer__column} aria-labelledby="footer-shop">
        <h3 className={styles.footer__title} id="footer-shop">
          {BRAND_NAME}
        </h3>
        <p className={styles.footer__text}>{FOOTER_TAGLINE}</p>
        <FooterSocialIcons links={SOCIAL_LINKS} />
      </section>
      {FOOTER_COLUMNS.map((column) => (
        <FooterSection key={column.title} section={column} />
      ))}
    </div>
    <div className={styles.footer__bottom}>
      <p className={styles.footer__bottom_copyright}>
        {COPYRIGHT_NAME} © {FIRST_YEAR}-{new Date().getFullYear()}, All Rights Reserved
      </p>
      <FooterPaymentMethods />
    </div>
  </footer>
);
