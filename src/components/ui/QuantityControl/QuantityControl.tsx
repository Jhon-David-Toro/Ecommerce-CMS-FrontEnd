import type { FC } from "react";

import { Button } from "@/components/ui/Button";

import { DECREMENT_LABEL, INCREMENT_LABEL } from "./QuantityControl.constants";
import type { QuantityControlProps } from "./QuantityControl.types";
import { decrement, increment } from "./QuantityControl.utils";
import styles from "./QuantityControl.module.scss";

/**
 * QuantityControl: minus and plus buttons around the current quantity.
 *
 * @param props Component props.
 * @param props.quantity Current quantity.
 * @param props.setQuantity Receives the new quantity.
 * @returns The quantity control.
 */
export const QuantityControl: FC<QuantityControlProps> = ({ quantity, setQuantity }) => (
  <div className={styles.quantity} role="group" aria-label="Quantity control">
    <Button
      text={DECREMENT_LABEL}
      onClick={() => setQuantity(decrement(quantity))}
      className={styles.quantity__button}
      type="text"
      size="small"
      typeAttribute="button"
    />
    <span className={styles.quantity__value}>{quantity}</span>
    <Button
      text={INCREMENT_LABEL}
      onClick={() => setQuantity(increment(quantity))}
      className={styles.quantity__button}
      type="text"
      size="small"
      typeAttribute="button"
    />
  </div>
);
