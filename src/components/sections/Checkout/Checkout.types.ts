import type { CheckoutSubmission } from "@/components/patterns/CheckoutForm";
import type { CartItem, CartTotals } from "@/lib/cart/cart.types";

export interface BuildOrderParams {
  values: CheckoutSubmission;
  items: CartItem[];
  totals: CartTotals;
  userId: number | null;
}
