import type { Order } from "@/lib/orders/order.types";
import { formatDate } from "@/lib/shared/format/format";

import { STATUS_ACTIONS, STATUS_MESSAGES } from "./OrderHistory.constants";
import type { OrderAction } from "./OrderHistory.types";

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
