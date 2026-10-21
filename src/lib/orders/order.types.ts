export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export type PaymentMethod = "cash_on_delivery" | "bank_transfer";

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

export interface Order {
  id: number;
  number: string;
  userId: number | null;
  email: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Address;
  notes: string;
  createdAt: number;
}

export type OrderInput = Omit<Order, "id" | "number" | "status" | "createdAt">;

export interface OrderListOptions {
  userId?: number;
}
