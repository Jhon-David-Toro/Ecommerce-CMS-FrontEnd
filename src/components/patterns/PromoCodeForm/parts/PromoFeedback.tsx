import { cx } from "@/lib/shared/classnames/cx";

import type { PromoFeedbackProps } from "../PromoCodeForm.types";
import { getPromoStatus } from "../PromoCodeForm.utils";
import styles from "../PromoCodeForm.module.scss";

/**
 * PromoCodeForm/Feedback: tells the shopper whether the applied code is valid and how much it takes off.
 *
 * @param props Component props.
 * @param props.appliedCode Code currently applied to the cart.
 * @param props.discountPercent Discount that the applied code gives; 0 means the code is not valid.
 * @returns The message, or null when no code is applied.
 */
export const PromoFeedback = ({ appliedCode, discountPercent }: PromoFeedbackProps) => {
  const status = getPromoStatus(appliedCode, discountPercent);

  if (status === "none") return null;

  return (
    <p className={cx(styles.promo__message, styles[`promo__message_${status}`])} role={status === "invalid" ? "alert" : undefined}>
      {status === "invalid" ? "This promo code is not valid." : `${discountPercent}% discount applied.`}
    </p>
  );
};
