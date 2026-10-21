import { MIN_QUANTITY } from "./QuantityControl.constants";

/**
 * Lowers a quantity by one without going under the minimum.
 *
 * @param quantity Current quantity.
 * @returns The new quantity.
 */
export const decrement = (quantity: number) => Math.max(quantity - 1, MIN_QUANTITY);

/**
 * Raises a quantity by one.
 *
 * @param quantity Current quantity.
 * @returns The new quantity.
 */
export const increment = (quantity: number) => quantity + 1;
