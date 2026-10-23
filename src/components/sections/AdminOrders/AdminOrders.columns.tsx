import Link from "next/link";

import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { OrderActions } from "@/components/patterns/OrderActions";
import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import type { Order, OrderStatus } from "@/lib/orders/order.types";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatDate, formatPrice } from "@/lib/shared/format/format";

export const ORDER_COLUMNS: Column<Order>[] = [
  { key: "number", header: "Order", render: (order) => <Link href={`/admin/orders/${order.id}`}>{order.number}</Link> },
  { key: "date", header: "Date", render: (order) => formatDate(new Date(order.createdAt).toISOString()) },
  { key: "customer", header: "Customer", render: (order) => order.address.fullName || order.email },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (order) => <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>,
  },
  { key: "total", header: "Total", align: "right", render: (order) => formatPrice(order.total) },
];

/**
 * Builds the last column of the orders table, with the icons that confirm payment, ship, deliver or cancel an order.
 *
 * @param onChange Called with the order id and the status to move to.
 * @returns The actions column.
 */
export const buildActionsColumn = (onChange: (id: number, status: OrderStatus) => void): Column<Order> => ({
  key: "actions",
  header: "Actions",
  align: "right",
  render: (order) => <OrderActions order={order} onChange={onChange} compact />,
});
