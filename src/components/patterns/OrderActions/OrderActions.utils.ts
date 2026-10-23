import type { OrderStatus } from "@/lib/orders/order.types";
import { canCancel, getNextStep } from "@/lib/orders/order.utils";

/**
 * Lists the actions that are available for an order: the next step and, until it is finished, cancelling.
 *
 * @param status Current status of the order.
 * @param cancelLabel Text of the cancel action.
 * @returns The status each action leads to, with its text.
 */
export const getActions = (status: OrderStatus, cancelLabel: string) => {
  const next = getNextStep(status);
  const cancel = canCancel(status) ? [{ to: "cancelled" as OrderStatus, label: cancelLabel }] : [];
  return [...(next ? [next] : []), ...cancel];
};
