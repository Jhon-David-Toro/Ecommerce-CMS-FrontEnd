import { ORDER_STATUSES, ORDER_STATUS_FLOW } from "@/lib/orders/order.constants";
import type { Order } from "@/lib/orders/order.types";

export const NO_FILTERS = {};

export const NO_ROWS: Order[] = [];

export const PAGE_SIZE = 10;

export const STATUS_FILTERS = [
  { value: "", label: "All statuses" },
  ...ORDER_STATUS_FLOW.map((value) => ({ value, label: ORDER_STATUSES[value] })),
];
