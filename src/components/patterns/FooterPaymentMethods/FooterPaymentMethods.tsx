import Image from "next/image";
import type { FC } from "react";

import { PAYMENT_ICON_SIZE, PAYMENT_METHODS } from "@/lib/site/footer.constants";

import styles from "./FooterPaymentMethods.module.scss";

/**
 * FooterPaymentMethods: row of badges of the accepted payment methods.
 *
 * @returns The payment badges.
 */
export const FooterPaymentMethods: FC = () => (
  <div className={styles.payment} role="list" aria-label="Accepted Payment Methods">
    {PAYMENT_METHODS.map((method) => (
      <div key={method.name} role="listitem">
        <Image src={method.src} alt={method.alt} {...PAYMENT_ICON_SIZE} className={styles.payment__icon} />
      </div>
    ))}
  </div>
);
