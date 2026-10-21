import type { FC } from "react";

import type { OrderHistoryProps } from "./OrderHistory.types";
import { NoOrders } from "./parts/NoOrders";
import { OrderHistoryBody } from "./parts/OrderHistoryBody";
import { OrderHistoryHead } from "./parts/OrderHistoryHead";
import styles from "./OrderHistory.module.scss";

/**
 * OrderHistory: table with the orders of a customer, or an invitation to shop when there are none.
 *
 * @param props Component props.
 * @param props.orders Orders to list, newest first.
 * @returns The table or the empty state.
 */
export const OrderHistory: FC<OrderHistoryProps> = ({ orders }) => {
  if (orders.length === 0) return <NoOrders />;

  return (
    <table className={styles.orders}>
      <OrderHistoryHead />
      <OrderHistoryBody orders={orders} />
    </table>
  );
};
