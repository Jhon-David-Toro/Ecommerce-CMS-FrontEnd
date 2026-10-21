import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatDate } from "@/lib/shared/format/format";

import type { OrderHeaderProps } from "../OrderDetails.types";
import styles from "../OrderDetails.module.scss";

/**
 * OrderDetails/Header: number, status badge and placement date of an order.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @returns The header.
 */
export const OrderHeader = ({ order }: OrderHeaderProps) => (
  <header className={styles.order__header}>
    <h2 className={styles.order__number}>Order {order.number}</h2>
    <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>
    <p className={styles.order__date}>Placed on {formatDate(new Date(order.createdAt).toISOString())}</p>
  </header>
);
