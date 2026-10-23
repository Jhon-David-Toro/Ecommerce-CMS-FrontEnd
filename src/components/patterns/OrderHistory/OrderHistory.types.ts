import type { Order } from "@/lib/orders/order.types";

export type OrderAction = "cancel" | "track" | "again";

export interface OrderHistoryProps {
  orders: Order[];
  onCancel?: (order: Order) => void;
  onBuyAgain?: (order: Order) => void;
}

export interface OrderCardProps {
  order: Order;
  onCancel?: (order: Order) => void;
  onBuyAgain?: (order: Order) => void;
}

export interface OrderCardHeadProps {
  order: Order;
}

export interface OrderThumbsProps {
  items: Order["items"];
}

export interface OrderCardActionsProps extends OrderCardProps {
  action: OrderAction | null;
}

export interface ExtraButton {
  text: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}
