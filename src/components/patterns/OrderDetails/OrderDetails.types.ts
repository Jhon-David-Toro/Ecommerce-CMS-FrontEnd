import type { ReactNode } from "react";

import type { Address, Order, OrderItem } from "@/lib/orders/order.types";

export interface OrderDetailsProps {
  order: Order;
  children?: ReactNode;
}

export interface OrderHeaderProps {
  order: Order;
}

export interface OrderItemListProps {
  items: OrderItem[];
}

export interface OrderItemRowProps {
  item: OrderItem;
}

export interface AddressBlockProps {
  address: Address;
  email: string;
}

export interface PaymentBlockProps {
  order: Order;
}

export interface OrderTotalsProps {
  order: Order;
  children?: ReactNode;
}
