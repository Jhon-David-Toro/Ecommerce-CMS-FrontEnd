import { FooterPaymentMethods } from "@/components/patterns/FooterPaymentMethods";

import { COPYRIGHT_NAME, FIRST_YEAR } from "../Footer.constants";
import styles from "../Footer.module.scss";

/**
 * Footer/Bottom: copyright line and accepted payment methods.
 *
 * @returns The bottom bar.
 */
export const FooterBottom = () => (
  <div className={styles.footer__bottom}>
    <p className={styles.footer__bottom_copyright}>
      {COPYRIGHT_NAME} © {FIRST_YEAR}-{new Date().getFullYear()}, All Rights Reserved
    </p>
    <FooterPaymentMethods />
  </div>
);
