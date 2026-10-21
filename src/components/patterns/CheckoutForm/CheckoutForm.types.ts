import type { PaymentMethod } from "@/lib/orders/order.types";

export interface CheckoutValues {
  email: string;
  phone: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
}

export interface CheckoutSubmission extends CheckoutValues {
  paymentMethod: PaymentMethod;
}

export interface CheckoutFormProps {
  defaultEmail: string;
  error?: string;
  isSubmitting: boolean;
  onSubmit: (values: CheckoutSubmission) => void;
}
