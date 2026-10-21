import { PAYMENT_METHODS } from "@/lib/orders/order.constants";

export const PAYMENT_OPTIONS = Object.entries(PAYMENT_METHODS).map(([value, label]) => ({ value, label }));

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
