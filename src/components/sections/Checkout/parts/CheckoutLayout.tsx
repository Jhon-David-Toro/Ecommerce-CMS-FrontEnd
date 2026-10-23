import { CheckoutForm } from "@/components/patterns/CheckoutForm";
import { OrderSummary } from "@/components/patterns/OrderSummary";

import type { CheckoutLayoutProps } from "../Checkout.types";
import { CheckoutItems } from "./CheckoutItems";
import styles from "../Checkout.module.scss";

/**
 * Checkout/Layout: the form next to the order summary with the list of items.
 *
 * @param props Component props.
 * @param props.checkout User, cart and order state of the checkout.
 * @returns The two columns.
 */
export const CheckoutLayout = ({ checkout }: CheckoutLayoutProps) => (
  <div className={styles.checkout__layout}>
    <CheckoutForm
      defaultEmail={checkout.user?.email ?? ""}
      error={checkout.error}
      isSubmitting={checkout.isSubmitting}
      onSubmit={checkout.handleSubmit}
    />
    <OrderSummary totals={checkout.cart.totals} discountPercent={checkout.cart.discountPercent}>
      <CheckoutItems items={checkout.cart.items} />
    </OrderSummary>
  </div>
);
