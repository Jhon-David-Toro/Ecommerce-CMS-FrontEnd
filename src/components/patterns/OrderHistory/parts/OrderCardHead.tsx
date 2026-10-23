import { Badge } from "@/components/ui/Badge";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatPrice } from "@/lib/shared/format/format";

import type { OrderCardHeadProps } from "../OrderHistory.types";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/CardHead: order number with its status badge, and the total.
 *
 * @param props Component props.
 * @param props.order Order of the card.
 * @returns The head.
 */
export const OrderCardHead = ({ order }: OrderCardHeadProps) => (
  <div className={styles.card__head}>
    <h3 className={styles.card__title}>Order {order.number}</h3>
    <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>
    <span className={styles.card__total}>{formatPrice(order.total)}</span>
  </div>
);
