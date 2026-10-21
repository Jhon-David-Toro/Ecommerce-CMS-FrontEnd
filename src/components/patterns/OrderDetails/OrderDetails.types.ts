import type { ReactNode } from "react";

import type { Order } from "@/lib/orders/order.types";

export interface OrderDetailsProps {
  order: Order;
  children?: ReactNode;
}
