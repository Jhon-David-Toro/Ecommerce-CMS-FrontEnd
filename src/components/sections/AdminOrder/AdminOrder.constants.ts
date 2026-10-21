import { ORDER_STATUSES, ORDER_STATUS_FLOW } from "@/lib/orders/order.constants";

export const STATUS_OPTIONS = ORDER_STATUS_FLOW.map((value) => ({ value, label: ORDER_STATUSES[value] }));

export const NOT_FOUND = {
  title: "Order not found",
  description: "That order does not exist.",
  backLabel: "Back to orders",
  backHref: "/admin/orders",
};
