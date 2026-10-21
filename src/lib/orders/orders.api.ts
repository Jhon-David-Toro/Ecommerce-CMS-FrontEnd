import { productRepository } from "@/lib/catalog/catalog.api";
import { createRepository } from "@/lib/mock/repository";

import { ORDER_NUMBER_PREFIX, ORDER_STORAGE_KEY } from "./order.constants";
import type { Order, OrderInput, OrderListOptions, OrderStatus } from "./order.types";
import { buildOrderNumber } from "./order.utils";

export const orderRepository = createRepository<Order>(ORDER_STORAGE_KEY, () => []);

/**
 * Lists orders, newest first, optionally for one customer.
 *
 * @param options Filters.
 * @param options.userId Only orders of this customer.
 * @returns The matching orders.
 */
export const listOrders = async ({ userId }: OrderListOptions = {}) =>
  (await orderRepository.list())
    .filter((order) => userId === undefined || order.userId === userId)
    .sort((a, b) => b.createdAt - a.createdAt);

/**
 * Finds one order.
 *
 * @param id Order id.
 * @returns The order, or null.
 */
export const getOrder = (id: number) => orderRepository.getById(id);

/**
 * Places an order and takes the sold units out of stock.
 *
 * @param input Order data.
 * @returns The created order.
 */
export const createOrder = async (input: OrderInput) => {
  const created = await orderRepository.create({ ...input, number: "", status: "pending", createdAt: Date.now() });
  const order = await orderRepository.update(created.id, { number: buildOrderNumber(created.id, ORDER_NUMBER_PREFIX) });
  await Promise.all(
    input.items.map(async (item) => {
      const product = await productRepository.getById(item.productId);
      if (product) await productRepository.update(product.id, { stock: Math.max(product.stock - item.quantity, 0) });
    }),
  );
  return order;
};

/**
 * Moves an order to another status.
 *
 * @param id Order id.
 * @param status New status.
 * @returns The updated order.
 */
export const setOrderStatus = (id: number, status: OrderStatus) => orderRepository.update(id, { status });
