import type { CartItem } from "@/lib/cart/cart.types";

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}

export interface CartItemBodyProps {
  item: CartItem;
}

export interface RemoveButtonProps {
  name: string;
  itemKey: string;
  onRemove: (key: string) => void;
}
