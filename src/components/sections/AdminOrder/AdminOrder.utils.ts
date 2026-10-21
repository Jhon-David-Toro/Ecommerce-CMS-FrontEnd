import { ORDER_STATUS_FLOW } from "@/lib/orders/order.constants";
import type { OrderStatus } from "@/lib/orders/order.types";

/**
 * Narrows the value of a select to an order status.
 *
 * @param value Raw value from the select.
 * @returns The matching status, or the first one when the value is unknown.
 */
export const toOrderStatus = (value: string): OrderStatus => ORDER_STATUS_FLOW.find((status) => status === value) ?? ORDER_STATUS_FLOW[0];
