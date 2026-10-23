import type { CartItem } from "@/lib/cart/cart.types";
import type { OrderInput } from "@/lib/orders/order.types";

import type { BuildOrderParams } from "./Checkout.types";

/**
 * Turns the checkout form and the cart into the data of an order.
 *
 * @param params Order sources.
 * @param params.values Checkout form values.
 * @param params.items Cart lines.
 * @param params.totals Amounts of the cart.
 * @param params.userId Id of the signed-in user, or null for a guest.
 * @returns The order input.
 */
export const buildOrderInput = ({ values, items, totals, userId }: BuildOrderParams): OrderInput => ({
  userId,
  email: values.email.trim().toLowerCase(),
  items: items.map(({ productId, name, image, price, quantity, color, size }: CartItem) => ({
    productId,
    name,
    image,
    price,
    quantity,
    color,
    size,
  })),
  subtotal: totals.subtotal,
  discount: totals.discount,
  shipping: totals.shipping,
  total: totals.total,
  paymentMethod: values.paymentMethod,
  address: {
    fullName: values.fullName.trim(),
    phone: values.phone.trim(),
    street: values.street.trim(),
    city: values.city.trim(),
    state: values.state.trim(),
    postalCode: values.postalCode.trim(),
    country: values.country.trim(),
  },
  notes: values.notes.trim(),
});
