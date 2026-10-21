import { PAYMENT_METHODS } from "@/lib/orders/order.constants";

import type { PaymentBlockProps } from "../OrderDetails.types";
import styles from "../OrderDetails.module.scss";

/**
 * OrderDetails/PaymentBlock: payment method and notes of an order.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @returns The block.
 */
export const PaymentBlock = ({ order }: PaymentBlockProps) => (
  <section className={styles.order__block} aria-label="Payment">
    <h3>Payment</h3>
    <p>{PAYMENT_METHODS[order.paymentMethod]}</p>
    {order.notes && <p>Notes: {order.notes}</p>}
  </section>
);
