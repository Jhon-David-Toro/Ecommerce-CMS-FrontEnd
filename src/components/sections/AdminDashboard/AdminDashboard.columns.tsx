import Link from "next/link";

import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/catalog/product.types";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import type { Order } from "@/lib/orders/order.types";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatPrice } from "@/lib/shared/format/format";

export const RECENT_ORDER_COLUMNS: Column<Order>[] = [
  { key: "number", header: "Order", render: (order) => <Link href={`/admin/orders/${order.id}`}>{order.number}</Link> },
  {
    key: "status",
    header: "Status",
    render: (order) => <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>,
  },
  { key: "total", header: "Total", align: "right", render: (order) => formatPrice(order.total) },
];

export const LOW_STOCK_COLUMNS: Column<Product>[] = [
  { key: "name", header: "Product", render: (product) => <Link href={`/admin/products/${product.id}`}>{product.name}</Link> },
  { key: "stock", header: "Stock", align: "right", render: (product) => <Badge tone="danger">{String(product.stock)}</Badge> },
];
