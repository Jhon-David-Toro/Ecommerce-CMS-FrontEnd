import type { FC } from "react";

import type { OrderDetailsProps } from "./OrderDetails.types";
import { AddressBlock } from "./parts/AddressBlock";
import { OrderHeader } from "./parts/OrderHeader";
import { OrderItemList } from "./parts/OrderItemList";
import { OrderTotals } from "./parts/OrderTotals";
import { PaymentBlock } from "./parts/PaymentBlock";
import styles from "./OrderDetails.module.scss";

/**
 * OrderDetails: number, status, lines, delivery address, payment method and totals of an order.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.children Extra controls shown under the totals, such as admin actions.
 * @returns The order details.
 */
export const OrderDetails: FC<OrderDetailsProps> = ({ order, children }) => (
  <article className={styles.order}>
    <OrderHeader order={order} />
    <div className={styles.order__layout}>
      <div className={styles.order__main}>
        <OrderItemList items={order.items} />
        <AddressBlock address={order.address} email={order.email} />
        <PaymentBlock order={order} />
      </div>
      <OrderTotals order={order}>{children}</OrderTotals>
    </div>
  </article>
);
