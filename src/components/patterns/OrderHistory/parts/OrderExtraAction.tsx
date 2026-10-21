import { Button } from "@/components/ui/Button";

import { ACTION_LABELS } from "../OrderHistory.constants";
import type { OrderCardActionsProps } from "../OrderHistory.types";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/ExtraAction: the second button of a card: track a shipped order, cancel a pending one or buy a delivered one again.
 *
 * @param props Component props.
 * @param props.order Order of the card.
 * @param props.action Extra action for this status, if any.
 * @param props.onCancel Called with the order when it is cancelled.
 * @param props.onBuyAgain Called with the order when it is bought again.
 * @returns The button, or null when the status has no extra action.
 */
export const OrderExtraAction = ({ order, action, onCancel, onBuyAgain }: OrderCardActionsProps) => {
  if (action === "track") {
    return <Button type="secondary" size="medium" text={ACTION_LABELS.track} href={`/account/orders/${order.id}`} typeAttribute="button" />;
  }
  if (action === "cancel" && onCancel) {
    return (
      <Button
        type="secondary"
        size="medium"
        text={ACTION_LABELS.cancel}
        onClick={() => onCancel(order)}
        typeAttribute="button"
        className={styles.card__danger}
      />
    );
  }
  if (action === "again" && onBuyAgain) {
    return <Button type="secondary" size="medium" text={ACTION_LABELS.again} onClick={() => onBuyAgain(order)} typeAttribute="button" />;
  }
  return null;
};
