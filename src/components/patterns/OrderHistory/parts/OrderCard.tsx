import type { OrderCardProps } from "../OrderHistory.types";
import { describeOrder, getAction } from "../OrderHistory.utils";
import { OrderCardActions } from "./OrderCardActions";
import { OrderCardHead } from "./OrderCardHead";
import { OrderThumbs } from "./OrderThumbs";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/Card: number, status and total of an order, what it holds and the buttons that fit its status.
 *
 * @param props Component props.
 * @param props.order Order of the card.
 * @param props.onCancel Called with the order when the customer cancels it.
 * @param props.onBuyAgain Called with the order when the customer buys it again.
 * @returns The list item.
 */
export const OrderCard = (props: OrderCardProps) => (
  <li className={styles.card}>
    <OrderCardHead order={props.order} />
    <p className={styles.card__meta}>{describeOrder(props.order)}</p>
    <div className={styles.card__body}>
      <OrderThumbs items={props.order.items} />
      <OrderCardActions {...props} action={getAction(props.order)} />
    </div>
  </li>
);
