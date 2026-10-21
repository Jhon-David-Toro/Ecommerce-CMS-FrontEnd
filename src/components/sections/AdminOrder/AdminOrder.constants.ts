import { ORDER_STATUSES, ORDER_STATUS_FLOW } from "@/lib/orders/order.constants";

export const STATUS_OPTIONS = ORDER_STATUS_FLOW.map((value) => ({ value, label: ORDER_STATUSES[value] }));
