import { isAdminSession } from "@/lib/auth/auth.session";
import { apiRequest } from "@/lib/shared/http/apiClient";
import { nullWhenMissing } from "@/lib/shared/http/remoteRepository";

import type { Order, OrderInput, OrderListOptions, OrderStatus } from "./order.types";

/**
 * Lists orders, newest first: the ones of the signed-in customer when a user is asked for, every order for administrators.
 *
 * @param options Filters.
 * @param options.userId When given, lists the orders of the session instead of all of them.
 * @returns The orders.
 */
export const listOrders = ({ userId }: OrderListOptions = {}) =>
  apiRequest<Order[]>(userId === undefined ? "/api/admin/orders" : "/api/orders");

/**
 * Finds one order of the signed-in customer, or any order for administrators.
 *
 * @param id Order id.
 * @returns The order, or null.
 */
export const getOrder = (id: number) => apiRequest<Order>(`/api/orders/${id}`).catch(nullWhenMissing);

/**
 * Places an order. The server works out the prices, the discount, the shipping and the total from the catalog,
 * so only the lines, the address, the payment method and the promo code are sent.
 *
 * @param input Order data.
 * @param promoCode Promo code typed in the cart.
 * @returns The created order.
 */
export const createOrder = (input: OrderInput, promoCode = "") =>
  apiRequest<Order>("/api/orders", {
    method: "POST",
    body: {
      email: input.email,
      items: input.items.map(({ productId, color, size, quantity }) => ({ productId, color, size, quantity })),
      address: input.address,
      paymentMethod: input.paymentMethod,
      notes: input.notes,
      promoCode: promoCode.trim() || undefined,
    },
  });

/**
 * Moves an order to another status: administrators set any allowed status, customers can only cancel their own order.
 *
 * @param id Order id.
 * @param status New status.
 * @returns The updated order.
 */
export const setOrderStatus = (id: number, status: OrderStatus) =>
  isAdminSession()
    ? apiRequest<Order>(`/api/admin/orders/${id}/status`, { method: "PATCH", body: { status } })
    : apiRequest<Order>(`/api/orders/${id}/cancel`, { method: "POST" });
