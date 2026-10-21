import Link from "next/link";
import type { FC } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatDate, formatPrice } from "@/lib/shared/format/format";

import type { OrderHistoryProps } from "./OrderHistory.types";
import styles from "./OrderHistory.module.scss";

/**
 * OrderHistory: table with the orders of a customer, or an invitation to shop when there are none.
 *
 * @param props Component props.
 * @param props.orders Orders to list, newest first.
 * @returns The table or the empty state.
 */
export const OrderHistory: FC<OrderHistoryProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="When you place an order it will show up here."
        action={<Button type="primary" size="medium" text="Start shopping" href="/products" typeAttribute="button" />}
      />
    );
  }

  return (
    <table className={styles.orders}>
      <thead>
        <tr>
          <th scope="col">Order</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <Link href={`/account/orders/${order.id}`}>{order.number}</Link>
            </td>
            <td>{formatDate(new Date(order.createdAt).toISOString())}</td>
            <td>
              <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>
            </td>
            <td>{formatPrice(order.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
