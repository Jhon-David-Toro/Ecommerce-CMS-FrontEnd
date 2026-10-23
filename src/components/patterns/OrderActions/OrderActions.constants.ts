import { CheckBadgeIcon, CheckCircleIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import type { ComponentType } from "react";

import type { OrderStatus } from "@/lib/orders/order.types";

export const STATUS_ICONS: Record<OrderStatus, ComponentType<{ className?: string }>> = {
  pending: CheckCircleIcon,
  paid: CheckCircleIcon,
  shipped: TruckIcon,
  delivered: CheckBadgeIcon,
  cancelled: XCircleIcon,
};

export const CANCEL_LABEL = "Cancel order";
