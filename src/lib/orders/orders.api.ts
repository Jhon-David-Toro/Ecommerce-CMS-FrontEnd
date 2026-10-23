import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import type { OrderInput } from "./order.types";
import * as mock from "./orders.mock";
import * as remote from "./orders.remote";

const source = IS_API_ENABLED ? remote : mock;

export const orderRepository = mock.orderRepository;
export const listOrders = source.listOrders;
export const getOrder = source.getOrder;

/**
 * Places an order; with the API the server also needs the promo code to work out the discount.
 *
 * @param input Order data.
 * @param promoCode Promo code typed in the cart.
 * @returns The created order.
 */
export const createOrder = (input: OrderInput, promoCode = "") =>
  IS_API_ENABLED ? remote.createOrder(input, promoCode) : mock.createOrder(input);

export const setOrderStatus = source.setOrderStatus;
