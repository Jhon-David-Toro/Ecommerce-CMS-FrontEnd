import { FooterSocialIcons } from "@/components/patterns/FooterSocialIcons";
import { SOCIAL_LINKS } from "@/lib/site/footer.constants";

import { BRAND_NAME } from "../Footer.constants";
import type { FooterBrandProps } from "../Footer.types";
import styles from "../Footer.module.scss";

/**
 * Footer/Brand: store name, tagline and social links.
 *
 * @param props Component props.
 * @param props.tagline Short description of the store.
 * @returns The brand column.
 */
export const FooterBrand = ({ tagline }: FooterBrandProps) => (
  <section className={styles.footer__column} aria-labelledby="footer-shop">
    <h3 className={styles.footer__title} id="footer-shop">
      {BRAND_NAME}
    </h3>
    <p className={styles.footer__text}>{tagline}</p>
    <FooterSocialIcons links={SOCIAL_LINKS} />
  </section>
);
