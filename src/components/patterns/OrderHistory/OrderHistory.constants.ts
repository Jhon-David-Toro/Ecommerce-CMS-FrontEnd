import type { OrderStatus } from "@/lib/orders/order.types";

import type { OrderAction } from "./OrderHistory.types";

export const STATUS_MESSAGES: Record<OrderStatus, string> = {
  pending: "Waiting for your payment",
  paid: "Payment confirmed, we are preparing it",
  shipped: "On its way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_ACTIONS: Partial<Record<OrderStatus, OrderAction>> = {
  pending: "cancel",
  shipped: "track",
  delivered: "again",
};

export const ACTION_LABELS: Record<OrderAction, string> = {
  cancel: "Cancel order",
  track: "Track order",
  again: "Buy again",
};

export const THUMBS_LIMIT = 4;

export const THUMB_SIZE = { width: 64, height: 64 } as const;
