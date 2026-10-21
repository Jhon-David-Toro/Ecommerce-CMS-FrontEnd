"use client";

import { EmptyGate } from "@/components/patterns/EmptyGate";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Spinner } from "@/components/ui/Spinner";
import { useCart } from "@/lib/cart/useCart";

import { CART_TRAIL, EMPTY_CART } from "./Cart.constants";
import { CartLayout } from "./parts/CartLayout";
import styles from "./Cart.module.scss";

/**
 * Cart: lines the shopper has chosen, with an order summary, promo code and a way to the checkout.
 *
 * @returns The cart page content.
 */
export const Cart = () => {
  const cart = useCart();

  if (!cart.isReady) return <Spinner label="Loading cart" />;

  return (
    <section className={styles.cart}>
      <Breadcrumb items={CART_TRAIL} />
      <h1 className={styles.cart__title}>YOUR CART</h1>
      <EmptyGate count={cart.items.length} empty={EMPTY_CART}>
        <CartLayout cart={cart} />
      </EmptyGate>
    </section>
  );
};
