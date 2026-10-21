"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CheckoutForm } from "@/components/patterns/CheckoutForm";
import type { CheckoutSubmission } from "@/components/patterns/CheckoutForm";
import { OrderSummary } from "@/components/patterns/OrderSummary";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/useAuth";
import { useCart } from "@/lib/cart/useCart";
import { createOrder } from "@/lib/orders/orders.api";

import { buildOrderInput } from "./Checkout.utils";
import styles from "./Checkout.module.scss";

/**
 * Checkout: contact and delivery form next to the order summary; placing the order empties the cart.
 *
 * @returns The checkout page content.
 */
export const Checkout = () => {
  const router = useRouter();
  const { user, isReady: isAuthReady } = useAuth();
  const { items, isReady, totals, discountPercent, clear } = useCart();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReady || !isAuthReady) return <Spinner label="Loading checkout" />;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add something to your cart before checking out."
        action={<Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />}
      />
    );
  }

  /**
   * Places the order, empties the cart and opens the confirmation.
   *
   * @param values Checkout form values.
   */
  const handleSubmit = async (values: CheckoutSubmission) => {
    setIsSubmitting(true);
    setError("");
    try {
      const order = await createOrder(buildOrderInput({ values, items, totals, userId: user?.id ?? null }));
      clear();
      router.push(`/checkout/success/${order.id}`);
    } catch {
      setError("We could not place your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.checkout}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className={styles.checkout__title}>CHECKOUT</h1>
      <div className={styles.checkout__layout}>
        <CheckoutForm defaultEmail={user?.email ?? ""} error={error} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        <OrderSummary totals={totals} discountPercent={discountPercent}>
          <ul className={styles.checkout__items} aria-label="Items in your order">
            {items.map((item) => (
              <li key={`${item.productId}-${item.color}-${item.size}`}>
                {item.quantity} x {item.name} ({item.size}, {item.color})
              </li>
            ))}
          </ul>
        </OrderSummary>
      </div>
    </section>
  );
};
