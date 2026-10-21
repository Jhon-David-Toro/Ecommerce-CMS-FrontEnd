import type { OrderHistoryProps } from "../OrderHistory.types";
import { OrderHistoryRow } from "./OrderHistoryRow";

/**
 * OrderHistory/Body: one row for each order.
 *
 * @param props Component props.
 * @param props.orders Orders to list.
 * @returns The table body.
 */
export const OrderHistoryBody = ({ orders }: OrderHistoryProps) => (
  <tbody>
    {orders.map((order) => (
      <OrderHistoryRow key={order.id} order={order} />
    ))}
  </tbody>
);
