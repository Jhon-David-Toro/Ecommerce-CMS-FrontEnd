import { useState } from "react";

import { ChipFilter } from "@/components/patterns/ChipFilter";
import { OrderHistory } from "@/components/patterns/OrderHistory";
import { Spinner } from "@/components/ui/Spinner";

import { ORDER_FILTERS } from "../Account.constants";
import type { AccountOrdersProps } from "../Account.types";
import { buildOrderChips, filterOrders } from "../Account.utils";
import { useOrderActions } from "../hooks/useOrderActions";
import styles from "../Account.module.scss";

/**
 * Account/Orders: the order history of the customer with chips to narrow it, or a spinner while it loads.
 *
 * @param props Component props.
 * @param props.orders Orders of the customer; null while they load.
 * @param props.onOrdersChange Reloads the orders after one of them changes.
 * @returns The chips and the history.
 */
export const AccountOrders = ({ orders, onOrdersChange }: AccountOrdersProps) => {
  const [filter, setFilter] = useState<string>(ORDER_FILTERS.all);
  const { cancel, buyAgain } = useOrderActions(onOrdersChange);

  if (!orders) return <Spinner label="Loading your orders" />;

  return (
    <div className={styles.account__orders}>
      <ChipFilter label="Filter orders" options={buildOrderChips(orders)} value={filter} onChange={setFilter} />
      <OrderHistory orders={filterOrders(orders, filter)} onCancel={cancel} onBuyAgain={buyAgain} />
    </div>
  );
};
