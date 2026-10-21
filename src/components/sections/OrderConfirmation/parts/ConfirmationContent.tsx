import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Button } from "@/components/ui/Button";

import type { ConfirmationContentProps } from "../OrderConfirmation.types";
import styles from "../OrderConfirmation.module.scss";

/**
 * OrderConfirmation/Content: thank you message, the details of the order and a link to keep shopping.
 *
 * @param props Component props.
 * @param props.order Order that was just placed.
 * @returns The content.
 */
export const ConfirmationContent = ({ order }: ConfirmationContentProps) => (
  <section className={styles.confirmation}>
    <h1 className={styles.confirmation__title}>THANK YOU FOR YOUR ORDER!</h1>
    <p className={styles.confirmation__text}>We sent the details to {order.email}. We will let you know when your order ships.</p>
    <OrderDetails order={order} />
    <Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />
  </section>
);
