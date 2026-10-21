import type { Order } from "@/lib/orders/order.types";

export interface OrderHistoryProps {
  orders: Order[];
}

export interface OrderHistoryRowProps {
  order: Order;
}
