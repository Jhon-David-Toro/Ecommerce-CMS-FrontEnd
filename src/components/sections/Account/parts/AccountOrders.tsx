import { OrderHistory } from "@/components/patterns/OrderHistory";
import { Spinner } from "@/components/ui/Spinner";

import type { AccountOrdersProps } from "../Account.types";

/**
 * Account/Orders: the order history of the customer, or a spinner while it loads.
 *
 * @param props Component props.
 * @param props.orders Orders of the customer; null while they load.
 * @returns The history.
 */
export const AccountOrders = ({ orders }: AccountOrdersProps) =>
  orders ? <OrderHistory orders={orders} /> : <Spinner label="Loading your orders" />;
