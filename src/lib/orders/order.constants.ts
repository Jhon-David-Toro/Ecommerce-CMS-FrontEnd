import type { OrderStatus, PaymentMethod } from "./order.types";

export const ORDER_STORAGE_KEY = "orders";

export const ORDER_STATUSES: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  cash_on_delivery: "Cash on delivery",
  bank_transfer: "Bank transfer",
};

export const ORDER_NUMBER_PREFIX = "SH-";

export const EMPTY_ADDRESS = { fullName: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "" };

export const REVENUE_STATUSES: OrderStatus[] = ["paid", "shipped", "delivered"];
