import type { OrderStatus } from "@/lib/orders/order.types";
import { canCancel, getNextStep } from "@/lib/orders/order.utils";

import { PROGRESS_STATUSES } from "./AdminOrder.constants";

/**
 * Gives the stage of the progress line an order is on.
 *
 * @param status Current status of the order.
 * @returns The stage number starting at 1, a number past the last stage once delivered, or 0 for a cancelled order.
 */
export const getProgressStage = (status: OrderStatus) => {
  const index = PROGRESS_STATUSES.indexOf(status);
  if (index < 0) return 0;
  return status === "delivered" ? PROGRESS_STATUSES.length + 1 : index + 1;
};

/**
 * Tells whether an order can still move forward or be cancelled.
 *
 * @param status Current status of the order.
 * @returns True while there is a next step or the order can be cancelled.
 */
export const hasActions = (status: OrderStatus) => Boolean(getNextStep(status)) || canCancel(status);
