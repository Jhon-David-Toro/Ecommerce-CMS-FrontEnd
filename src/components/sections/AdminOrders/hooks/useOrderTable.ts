import type { ListTable } from "@/components/patterns/AdminListView";
import type { Order } from "@/lib/orders/order.types";

import { ORDER_COLUMNS } from "../AdminOrders.columns";

/**
 * Describes the orders table: caption, empty message and one column per fact about an order.
 *
 * @returns The table description.
 */
export const useOrderTable = (): ListTable<Order> => ({
  caption: "Orders",
  emptyTitle: "No orders found",
  getRowKey: (order) => order.id,
  columns: ORDER_COLUMNS,
});
