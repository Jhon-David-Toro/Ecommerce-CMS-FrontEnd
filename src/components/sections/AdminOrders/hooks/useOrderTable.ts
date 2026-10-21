import type { ListTable } from "@/components/patterns/AdminListView";
import type { Order, OrderStatus } from "@/lib/orders/order.types";

import { ORDER_COLUMNS, buildActionsColumn } from "../AdminOrders.columns";

/**
 * Describes the orders table: one column per fact about an order and the icons that move it along.
 *
 * @param onChange Called with the order id and the status to move to.
 * @returns The table description.
 */
export const useOrderTable = (onChange: (id: number, status: OrderStatus) => void): ListTable<Order> => ({
  caption: "Orders",
  emptyTitle: "No orders found",
  getRowKey: (order) => order.id,
  columns: [...ORDER_COLUMNS, buildActionsColumn(onChange)],
});
