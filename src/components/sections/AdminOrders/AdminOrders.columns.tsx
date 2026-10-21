import Link from "next/link";

import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import type { Order } from "@/lib/orders/order.types";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatDate, formatPrice } from "@/lib/shared/format/format";

export const ORDER_COLUMNS: Column<Order>[] = [
  { key: "number", header: "Order", render: (order) => <Link href={`/admin/orders/${order.id}`}>{order.number}</Link> },
  { key: "date", header: "Date", render: (order) => formatDate(new Date(order.createdAt).toISOString()) },
  { key: "customer", header: "Customer", render: (order) => order.address.fullName || order.email },
  {
    key: "status",
    header: "Status",
    render: (order) => <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>,
  },
  { key: "total", header: "Total", align: "right", render: (order) => formatPrice(order.total) },
];
