import { CheckoutSteps } from "@/components/patterns/CheckoutSteps";
import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Button } from "@/components/ui/Button";

import { ALL_DONE_STEP } from "../OrderConfirmation.constants";
import type { ConfirmationContentProps } from "../OrderConfirmation.types";
import { ConfirmationHero } from "./ConfirmationHero";
import styles from "../OrderConfirmation.module.scss";

/**
 * OrderConfirmation/Content: thank you message, ticked progress, the details of the order and the buttons to keep going.
 *
 * @param props Component props.
 * @param props.order Order that was just placed.
 * @returns The content.
 */
export const ConfirmationContent = ({ order }: ConfirmationContentProps) => (
  <section className={styles.confirmation}>
    <ConfirmationHero email={order.email} />
    <CheckoutSteps current={ALL_DONE_STEP} />
    <OrderDetails order={order} />
    <div className={styles.confirmation__actions}>
      <Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />
      <Button type="secondary" size="medium" text="View my orders" href="/account" typeAttribute="button" />
    </div>
  </section>
);
