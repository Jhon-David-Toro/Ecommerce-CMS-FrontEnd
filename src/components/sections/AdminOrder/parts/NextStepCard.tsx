import { OrderActions } from "@/components/patterns/OrderActions";

import type { OrderContentProps } from "../AdminOrder.types";
import { hasActions } from "../AdminOrder.utils";
import styles from "../AdminOrder.module.scss";

/**
 * AdminOrder/NextStepCard: dark card with the buttons that move the order forward or cancel it; nothing once it is finished.
 *
 * @param props Component props.
 * @param props.order Order to act on.
 * @param props.onStatusChange Called with the order id and the new status.
 * @returns The card, or nothing.
 */
export const NextStepCard = ({ order, onStatusChange }: OrderContentProps) => {
  if (!hasActions(order.status)) return null;

  return (
    <div className={styles.next}>
      <h2 className={styles.next__title}>Next step</h2>
      <OrderActions order={order} onChange={onStatusChange} inverted />
    </div>
  );
};
