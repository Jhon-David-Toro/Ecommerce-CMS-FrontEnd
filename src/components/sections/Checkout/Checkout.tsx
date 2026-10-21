"use client";

import { EmptyGate } from "@/components/patterns/EmptyGate";
import { Spinner } from "@/components/ui/Spinner";

import { EMPTY_CHECKOUT_CART } from "./Checkout.constants";
import { useCheckout } from "./hooks/useCheckout";
import { CheckoutHeader } from "./parts/CheckoutHeader";
import { CheckoutLayout } from "./parts/CheckoutLayout";
import styles from "./Checkout.module.scss";

/**
 * Checkout: contact and delivery form next to the order summary; placing the order empties the cart.
 *
 * @returns The checkout page content.
 */
export const Checkout = () => {
  const checkout = useCheckout();

  if (!checkout.isReady) return <Spinner label="Loading checkout" />;

  return (
    <section className={styles.checkout}>
      <CheckoutHeader />
      <EmptyGate count={checkout.cart.items.length} empty={EMPTY_CHECKOUT_CART}>
        <CheckoutLayout checkout={checkout} />
      </EmptyGate>
    </section>
  );
};
