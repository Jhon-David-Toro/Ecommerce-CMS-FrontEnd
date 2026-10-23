import { getShipping } from "@/lib/orders/order.utils";

import { MAX_ITEM_QUANTITY } from "./cart.constants";
import type { CartItem, CartTotals, TotalsParams } from "./cart.types";

/**
 * Builds the key that tells cart lines apart: the same product in another color or size is another line.
 *
 * @param item Cart line, or the parts that identify it.
 * @returns The line key.
 */
export const getItemKey = ({ productId, color, size }: Pick<CartItem, "productId" | "color" | "size">) => `${productId}-${color}-${size}`;

/**
 * Limits a quantity to what can be bought: at least one, at most the stock and the per-line maximum.
 *
 * @param quantity Wanted quantity.
 * @param stock Units in stock.
 * @returns The allowed quantity.
 */
export const clampQuantity = (quantity: number, stock: number) => Math.max(1, Math.min(quantity, stock, MAX_ITEM_QUANTITY));

/**
 * Adds a line to the cart, merging it with an existing line of the same product, color and size.
 *
 * @param items Current lines.
 * @param item Line to add.
 * @returns The new lines.
 */
export const addToItems = (items: CartItem[], item: CartItem) => {
  const key = getItemKey(item);
  const existing = items.find((current) => getItemKey(current) === key);
  if (!existing) return [...items, { ...item, quantity: clampQuantity(item.quantity, item.stock) }];
  return items.map((current) =>
    current === existing ? { ...current, quantity: clampQuantity(current.quantity + item.quantity, current.stock) } : current,
  );
};

/**
 * Changes the quantity of a line.
 *
 * @param items Current lines.
 * @param key Key of the line.
 * @param quantity New quantity.
 * @returns The new lines.
 */
export const setItemQuantity = (items: CartItem[], key: string, quantity: number) =>
  items.map((item) => (getItemKey(item) === key ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item));

/**
 * Removes a line.
 *
 * @param items Current lines.
 * @param key Key of the line.
 * @returns The remaining lines.
 */
export const removeFromItems = (items: CartItem[], key: string) => items.filter((item) => getItemKey(item) !== key);

/**
 * Counts the units in the cart.
 *
 * @param items Cart lines.
 * @returns The total quantity.
 */
export const countItems = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Calculates what the customer pays.
 *
 * @param params Cart and pricing rules.
 * @param params.items Cart lines.
 * @param params.shippingFee Standard shipping fee.
 * @param params.freeShippingOver Subtotal from which shipping is free.
 * @param params.discountPercent Promo discount, as a percentage of the subtotal.
 * @returns Subtotal, discount, shipping and total.
 */
export const calculateTotals = ({ items, shippingFee, freeShippingOver, discountPercent }: TotalsParams): CartTotals => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent) / 100;
  const shipping = getShipping(subtotal - discount, shippingFee, freeShippingOver);

  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
};
