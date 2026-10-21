import { FooterSocialIcons } from "@/components/patterns/FooterSocialIcons";
import { SOCIAL_LINKS } from "@/lib/site/footer.constants";

import { BRAND_NAME, FOOTER_TAGLINE } from "../Footer.constants";
import styles from "../Footer.module.scss";

/**
 * Footer/Brand: store name, tagline and social links.
 *
 * @returns The brand column.
 */
export const FooterBrand = () => (
  <section className={styles.footer__column} aria-labelledby="footer-shop">
    <h3 className={styles.footer__title} id="footer-shop">
      {BRAND_NAME}
    </h3>
    <p className={styles.footer__text}>{FOOTER_TAGLINE}</p>
    <FooterSocialIcons links={SOCIAL_LINKS} />
  </section>
);
