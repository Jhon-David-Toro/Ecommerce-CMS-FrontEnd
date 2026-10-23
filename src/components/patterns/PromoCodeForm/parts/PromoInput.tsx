import { TagIcon } from "@heroicons/react/24/outline";

import type { PromoInputProps } from "../PromoCodeForm.types";
import styles from "../PromoCodeForm.module.scss";

/**
 * PromoCodeForm/Input: text field for the promo code with a tag icon inside.
 *
 * @param props Component props.
 * @param props.value Typed code.
 * @param props.onChange Called with the new text.
 * @returns The field.
 */
export const PromoInput = ({ value, onChange }: PromoInputProps) => (
  <div className={styles.promo__field}>
    <TagIcon className={styles.promo__icon} aria-hidden="true" />
    <input
      className={styles.promo__input}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Add promo code"
      aria-label="Promo code"
    />
  </div>
);
