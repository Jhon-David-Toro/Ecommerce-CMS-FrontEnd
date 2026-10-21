import type { CartItem } from "@/lib/cart/cart.types";

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}
