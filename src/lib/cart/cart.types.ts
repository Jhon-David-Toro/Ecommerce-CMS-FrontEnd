export interface CartItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  stock: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export interface TotalsParams {
  items: CartItem[];
  shippingFee: number;
  freeShippingOver: number;
  discountPercent: number;
}

export interface CartValues {
  items: CartItem[];
  promoCode: string;
  isReady: boolean;
}

export interface CartActions {
  hydrate: () => void;
  addItem: (item: CartItem) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  applyPromo: (code: string) => void;
  clear: () => void;
}

export type CartState = CartValues & CartActions;
