import { formatPrice } from "@/lib/shared/format/format";

/**
 * Writes the delivery fee, or "Free" when there is none.
 *
 * @param shipping Delivery fee.
 * @returns The text to show.
 */
export const formatShipping = (shipping: number) => (shipping === 0 ? "Free" : formatPrice(shipping));
