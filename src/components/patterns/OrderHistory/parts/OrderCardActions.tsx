import { Button } from "@/components/ui/Button";

import type { OrderCardActionsProps } from "../OrderHistory.types";
import { OrderExtraAction } from "./OrderExtraAction";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/CardActions: the "View details" link and the extra button that fits the status of the order.
 *
 * @param props Component props.
 * @param props.order Order of the card.
 * @param props.action Extra action for this status, if any.
 * @param props.onCancel Called with the order when it is cancelled.
 * @param props.onBuyAgain Called with the order when it is bought again.
 * @returns The buttons.
 */
export const OrderCardActions = ({ order, action, onCancel, onBuyAgain }: OrderCardActionsProps) => (
  <div className={styles.card__actions}>
    <Button type="primary" size="medium" text="View details" href={`/account/orders/${order.id}`} typeAttribute="button" />
    <OrderExtraAction order={order} action={action} onCancel={onCancel} onBuyAgain={onBuyAgain} />
  </div>
);
