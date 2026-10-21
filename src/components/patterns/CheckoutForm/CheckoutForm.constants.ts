import { PAYMENT_METHODS } from "@/lib/orders/order.constants";
import type { PaymentMethod } from "@/lib/orders/order.types";

export const PAYMENT_OPTIONS = (Object.keys(PAYMENT_METHODS) as PaymentMethod[]).map((value) => ({ value, label: PAYMENT_METHODS[value] }));

export const EMPTY_CHECKOUT = {
  email: "",
  phone: "",
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  notes: "",
};

export const DEFAULT_PAYMENT_METHOD: PaymentMethod = "cash_on_delivery";

export const PAYMENT_DESCRIPTIONS: Record<PaymentMethod, string> = {
  cash_on_delivery: "Pay when the order reaches you",
  bank_transfer: "We send you the account by email",
};
