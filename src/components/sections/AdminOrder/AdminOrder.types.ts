import type { Order, OrderStatus } from "@/lib/orders/order.types";

export interface OrderContentProps {
  order: Order;
  onStatusChange: (id: number, status: OrderStatus) => void;
}
