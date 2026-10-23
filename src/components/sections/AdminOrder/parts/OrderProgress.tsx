import { CheckoutSteps } from "@/components/patterns/CheckoutSteps";

import { PROGRESS_LABELS } from "../AdminOrder.constants";
import type { OrderProgressProps } from "../AdminOrder.types";
import { getProgressStage } from "../AdminOrder.utils";
import styles from "../AdminOrder.module.scss";

/**
 * AdminOrder/Progress: line with the stages of an order; nothing is shown for a cancelled order.
 *
 * @param props Component props.
 * @param props.status Current status of the order.
 * @returns The progress card, or nothing.
 */
export const OrderProgress = ({ status }: OrderProgressProps) => {
  const stage = getProgressStage(status);
  if (stage === 0) return null;

  return (
    <div className={styles.progress}>
      <CheckoutSteps current={stage} labels={PROGRESS_LABELS} label="Order progress" />
    </div>
  );
};
