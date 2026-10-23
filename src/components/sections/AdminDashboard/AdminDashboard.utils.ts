import type { Order } from "@/lib/orders/order.types";

import { ALL_TIME, DAY_MS } from "./AdminDashboard.constants";

/**
 * Keeps the orders placed inside a time range.
 *
 * @param orders Orders to filter.
 * @param range Number of days to look back, or "all" to keep everything.
 * @param now Current time in milliseconds.
 * @returns The orders created within the range.
 */
export const filterByRange = (orders: Order[], range: string, now: number) =>
  range === ALL_TIME ? orders : orders.filter((order) => order.createdAt >= now - Number(range) * DAY_MS);
