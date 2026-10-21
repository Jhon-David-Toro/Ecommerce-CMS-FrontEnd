import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import type { OrderStatus } from "@/lib/orders/order.types";

export const ORDER_TRAIL_ROOT = { label: "Orders", href: "/admin/orders" };

export const NOT_FOUND = {
  title: "Order not found",
  description: "That order does not exist.",
  backLabel: "Back to orders",
  backHref: "/admin/orders",
};

export const PROGRESS_STATUSES: OrderStatus[] = ["pending", "paid", "shipped", "delivered"];

export const PROGRESS_LABELS = PROGRESS_STATUSES.map((status) => ORDER_STATUSES[status]);
