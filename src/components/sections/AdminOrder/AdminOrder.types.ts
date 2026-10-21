import type { Order } from "@/lib/orders/order.types";

export interface OrderContentProps {
  order: Order;
  onStatusChange: (id: number, value: string) => void;
}
