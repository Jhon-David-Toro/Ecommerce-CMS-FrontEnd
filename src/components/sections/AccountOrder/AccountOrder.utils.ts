import type { PublicUser } from "@/lib/auth/auth.types";
import type { Order } from "@/lib/orders/order.types";

/**
 * Keeps an order only when it belongs to the signed-in customer.
 *
 * @param order Loaded order, if any.
 * @param user Signed-in user, if any.
 * @returns The order when it belongs to the user, otherwise null.
 */
export const getOwnOrder = (order: Order | null, user: PublicUser | null) => (order && user && order.userId === user.id ? order : null);
