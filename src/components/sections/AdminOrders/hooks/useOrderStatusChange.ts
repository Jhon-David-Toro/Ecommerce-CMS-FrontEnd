import type { OrderStatus } from "@/lib/orders/order.types";
import { setOrderStatus } from "@/lib/orders/orders.api";

/**
 * Builds the handler that saves a new order status and refreshes the list.
 *
 * @param reload Refreshes the list.
 * @returns The handler, called with the order id and the status to move to.
 */
export const useOrderStatusChange = (reload: () => void) => async (id: number, status: OrderStatus) => {
  await setOrderStatus(id, status);
  reload();
};
