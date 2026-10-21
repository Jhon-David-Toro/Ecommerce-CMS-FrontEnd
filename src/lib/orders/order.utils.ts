import { REVENUE_STATUSES, STATUS_TONES } from "./order.constants";
import type { Order, OrderItem, OrderStatus, StatusTone } from "./order.types";

/**
 * Sums the lines of an order.
 *
 * @param items Order lines.
 * @returns The subtotal.
 */
export const getSubtotal = (items: OrderItem[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/**
 * Chooses the shipping fee: free above a threshold, none for an empty cart.
 *
 * @param subtotal Cart subtotal.
 * @param fee Standard shipping fee.
 * @param freeOver Subtotal from which shipping is free.
 * @returns The shipping fee.
 */
export const getShipping = (subtotal: number, fee: number, freeOver: number) => (subtotal === 0 || subtotal >= freeOver ? 0 : fee);

/**
 * Builds the public number of an order.
 *
 * @param id Order id.
 * @param prefix Number prefix.
 * @returns The number, for example `SH-0042`.
 */
export const buildOrderNumber = (id: number, prefix: string) => `${prefix}${String(id).padStart(4, "0")}`;

/**
 * Adds up the revenue of the orders that count as sales.
 *
 * @param orders Orders to add up.
 * @returns The revenue.
 */
export const getRevenue = (orders: Order[]) =>
  orders.filter((order) => REVENUE_STATUSES.includes(order.status)).reduce((sum, order) => sum + order.total, 0);

/**
 * Picks the badge color that represents an order status.
 *
 * @param status Order status.
 * @returns The tone of the badge.
 */
export const getStatusTone = (status: OrderStatus): StatusTone => STATUS_TONES[status];

/**
 * Works out the percentage that a discount represents of a subtotal.
 *
 * @param subtotal Amount before the discount.
 * @param discount Discount amount.
 * @returns The discount as a whole percentage, or 0 for an empty subtotal.
 */
export const getDiscountPercent = (subtotal: number, discount: number) => (subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0);
