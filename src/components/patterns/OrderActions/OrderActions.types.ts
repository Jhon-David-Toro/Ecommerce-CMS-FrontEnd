import type { ComponentType } from "react";

import type { Order, OrderStatus } from "@/lib/orders/order.types";

export interface OrderActionsProps {
  order: Order;
  onChange: (id: number, status: OrderStatus) => void;
  compact?: boolean;
}

export interface OrderActionButtonProps {
  label: string;
  icon: ComponentType<{ className?: string }>;
  tone: "primary" | "danger";
  compact: boolean;
  onClick: () => void;
}
