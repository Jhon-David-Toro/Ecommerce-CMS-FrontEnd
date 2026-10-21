import { OrderHistory } from "@/components/patterns/OrderHistory";
import { Spinner } from "@/components/ui/Spinner";

import type { AccountOrdersProps } from "../Account.types";
import styles from "../Account.module.scss";

/**
 * Account/Orders: the order history of the customer, or a spinner while it loads.
 *
 * @param props Component props.
 * @param props.orders Orders of the customer; null while they load.
 * @returns The title and the history.
 */
export const AccountOrders = ({ orders }: AccountOrdersProps) => (
  <>
    <h2 className={styles.account__subtitle}>Order history</h2>
    {orders ? <OrderHistory orders={orders} /> : <Spinner label="Loading your orders" />}
  </>
);
