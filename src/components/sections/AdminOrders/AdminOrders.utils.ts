import type { Order } from "@/lib/orders/order.types";

/**
 * Tells whether an order matches the text typed in the search box.
 *
 * @param order Order to check.
 * @param text Search text, already lowercase.
 * @returns True when the number, email or customer name contains the text.
 */
export const matchesOrder = (order: Order, text: string) =>
  [order.number, order.email, order.address.fullName].some((value) => value.toLowerCase().includes(text));

/**
 * Keeps the orders with a given status.
 *
 * @param orders Orders to filter.
 * @param status Status to keep; empty keeps everything.
 * @returns The matching orders.
 */
export const filterByStatus = (orders: Order[], status: string) => (status ? orders.filter((order) => order.status === status) : orders);
