import type { Order } from "@/lib/orders/order.types";
import { formatDate } from "@/lib/shared/format/format";

import { ACTION_LABELS, STATUS_ACTIONS, STATUS_MESSAGES } from "./OrderHistory.constants";
import type { ExtraButton, OrderAction, OrderCardActionsProps } from "./OrderHistory.types";

/**
 * Chooses the extra action that fits the status of an order.
 *
 * @param order Order of the card.
 * @returns "cancel" for a pending order, "track" for a shipped one, "again" for a delivered one, otherwise null.
 */
export const getAction = (order: Order): OrderAction | null => STATUS_ACTIONS[order.status] ?? null;

/**
 * Writes the line under the title of an order card: date, number of items and what is happening with it.
 *
 * @param order Order of the card.
 * @returns The line, for example `June 1, 2025 · 2 items · On its way`.
 */
export const describeOrder = (order: Order) => {
  const count = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const items = count === 1 ? "1 item" : `${count} items`;
  return [formatDate(new Date(order.createdAt).toISOString()), items, STATUS_MESSAGES[order.status]].join(" · ");
};

/**
 * Describes the extra button of an order card.
 *
 * @param params Card state.
 * @param params.order Order of the card.
 * @param params.action Extra action for the status of the order.
 * @param params.onCancel Called with the order when it is cancelled.
 * @param params.onBuyAgain Called with the order when it is bought again.
 * @returns The text and behavior of the button, or null when it does not apply.
 */
export const getExtraButton = ({ order, action, onCancel, onBuyAgain }: OrderCardActionsProps): ExtraButton | null => {
  const buttons: Record<OrderAction, ExtraButton | null> = {
    track: { text: ACTION_LABELS.track, href: `/account/orders/${order.id}` },
    cancel: onCancel ? { text: ACTION_LABELS.cancel, onClick: () => onCancel(order), danger: true } : null,
    again: onBuyAgain ? { text: ACTION_LABELS.again, onClick: () => onBuyAgain(order) } : null,
  };
  return action ? buttons[action] : null;
};
