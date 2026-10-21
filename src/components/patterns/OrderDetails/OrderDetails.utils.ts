import type { Address, OrderItem } from "@/lib/orders/order.types";

/**
 * Builds a key that identifies an order line.
 *
 * @param item Order line.
 * @returns A key made of the product, color and size.
 */
export const getItemKey = (item: OrderItem) => `${item.productId}-${item.color}-${item.size}`;

/**
 * Writes the city line of an address: city, optional state and postal code.
 *
 * @param address Delivery address.
 * @returns The line, for example `Lima, Lima 15001`.
 */
export const formatCityLine = ({ city, state, postalCode }: Address) => `${[city, state].filter(Boolean).join(", ")} ${postalCode}`;
