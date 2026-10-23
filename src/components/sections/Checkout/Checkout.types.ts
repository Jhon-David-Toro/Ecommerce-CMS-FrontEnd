import type { CheckoutSubmission } from "@/components/patterns/CheckoutForm";
import type { PublicUser } from "@/lib/auth/auth.types";
import type { CartItem, CartTotals } from "@/lib/cart/cart.types";
import type { useCart } from "@/lib/cart/useCart";

export interface BuildOrderParams {
  values: CheckoutSubmission;
  items: CartItem[];
  totals: CartTotals;
  userId: number | null;
}

export interface CheckoutState {
  user: PublicUser | null;
  cart: ReturnType<typeof useCart>;
  error: string;
  isSubmitting: boolean;
  handleSubmit: (values: CheckoutSubmission) => void;
}

export interface CheckoutLayoutProps {
  checkout: CheckoutState;
}

export interface CheckoutItemsProps {
  items: CartItem[];
}
