import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatDate, formatPrice } from "@/lib/shared/format/format";

import type { OrderHistoryRowProps } from "../OrderHistory.types";

/**
 * OrderHistory/Row: number, date, status and total of one order.
 *
 * @param props Component props.
 * @param props.order Order of the row.
 * @returns The table row.
 */
export const OrderHistoryRow = ({ order }: OrderHistoryRowProps) => (
  <tr>
    <td>
      <Link href={`/account/orders/${order.id}`}>{order.number}</Link>
    </td>
    <td>{formatDate(new Date(order.createdAt).toISOString())}</td>
    <td>
      <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>
    </td>
    <td>{formatPrice(order.total)}</td>
  </tr>
);
