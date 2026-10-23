import { MIN_PASSWORD_LENGTH } from "@/lib/auth/auth.constants";
import type { Order } from "@/lib/orders/order.types";
import { compact, email, minLength, required } from "@/lib/shared/forms/validators";

import { IN_PROGRESS_STATUSES, ORDER_FILTERS } from "./Account.constants";
import type { PasswordValues, ProfileValues } from "./Account.types";

/**
 * Checks the profile form.
 *
 * @param values Name and email typed by the customer.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateProfile = (values: ProfileValues) =>
  compact({ name: required(values.name), email: required(values.email) ?? email(values.email) });

/**
 * Checks the password form.
 *
 * @param values Current, new and repeated password.
 * @returns The errors by field; empty when everything is valid.
 */
export const validatePassword = (values: PasswordValues) =>
  compact({
    current: required(values.current),
    next: required(values.next) ?? minLength(values.next, MIN_PASSWORD_LENGTH),
    confirm: values.confirm === values.next ? undefined : "The passwords do not match.",
  });

/**
 * Keeps the orders that belong to a filter.
 *
 * @param orders Orders of the customer.
 * @param filter "all", "progress" (not delivered or cancelled yet) or "delivered".
 * @returns The matching orders.
 */
export const filterOrders = (orders: Order[], filter: string) => {
  if (filter === ORDER_FILTERS.progress) return orders.filter((order) => IN_PROGRESS_STATUSES.includes(order.status));
  return filter === ORDER_FILTERS.delivered ? orders.filter((order) => order.status === "delivered") : orders;
};

/**
 * Builds the chips that narrow the order list, each with how many orders it holds.
 *
 * @param orders Orders of the customer.
 * @returns The chip options.
 */
export const buildOrderChips = (orders: Order[]) => [
  { value: ORDER_FILTERS.all, label: `All ${orders.length}` },
  { value: ORDER_FILTERS.progress, label: `In progress ${filterOrders(orders, ORDER_FILTERS.progress).length}` },
  { value: ORDER_FILTERS.delivered, label: `Delivered ${filterOrders(orders, ORDER_FILTERS.delivered).length}` },
];
