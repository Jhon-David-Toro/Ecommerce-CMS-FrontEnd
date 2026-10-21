import type { Order } from "@/lib/orders/order.types";

export interface ConfirmationContentProps {
  order: Order;
}

export interface ConfirmationHeroProps {
  email: string;
}
