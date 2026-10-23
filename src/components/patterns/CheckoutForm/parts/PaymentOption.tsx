import { cx } from "@/lib/shared/classnames/cx";

import { PAYMENT_DESCRIPTIONS } from "../CheckoutForm.constants";
import type { PaymentOptionProps } from "../CheckoutForm.types";
import styles from "../CheckoutForm.module.scss";

/**
 * CheckoutForm/PaymentOption: one payment method as a card with a radio button, a name and a short explanation.
 *
 * @param props Component props.
 * @param props.option Value and name of the method.
 * @param props.selected Whether this method is the chosen one.
 * @param props.onSelect Called with the method when the card is picked.
 * @returns The card.
 */
export const PaymentOption = ({ option, selected, onSelect }: PaymentOptionProps) => (
  <label className={cx(styles.option, selected && styles.option_selected)}>
    <input type="radio" name="payment-method" value={option.value} checked={selected} onChange={() => onSelect(option.value)} />
    <span className={styles.option__text}>
      <span className={styles.option__title}>{option.label}</span>
      <span className={styles.option__hint}>{PAYMENT_DESCRIPTIONS[option.value]}</span>
    </span>
  </label>
);
