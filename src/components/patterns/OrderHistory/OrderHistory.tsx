import type { FC } from "react";

import type { OrderHistoryProps } from "./OrderHistory.types";
import { NoOrders } from "./parts/NoOrders";
import { OrderCard } from "./parts/OrderCard";
import styles from "./OrderHistory.module.scss";

/**
 * OrderHistory: one card for each order of a customer, or an invitation to shop when there are none.
 *
 * @param props Component props.
 * @param props.orders Orders to list, newest first.
 * @param props.onCancel Called with a pending order the customer wants to cancel.
 * @param props.onBuyAgain Called with a delivered order the customer wants to buy again.
 * @returns The list or the empty state.
 */
export const OrderHistory: FC<OrderHistoryProps> = ({ orders, ...handlers }) => {
  if (orders.length === 0) return <NoOrders />;

  return (
    <ul className={styles.orders}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} {...handlers} />
      ))}
    </ul>
  );
};
