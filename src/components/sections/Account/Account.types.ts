import type { PublicUser } from "@/lib/auth/auth.types";
import type { Order } from "@/lib/orders/order.types";

export interface AccountProfileProps {
  user: PublicUser;
  onSignOut: () => void;
}

export interface AccountOrdersProps {
  orders: Order[] | null;
}
