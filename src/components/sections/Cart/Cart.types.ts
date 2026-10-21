import type { useCart } from "@/lib/cart/useCart";

export interface CartLayoutProps {
  cart: ReturnType<typeof useCart>;
}
