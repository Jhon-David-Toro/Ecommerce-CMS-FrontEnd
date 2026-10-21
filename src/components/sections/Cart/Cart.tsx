"use client";

import { CartItemRow } from "@/components/patterns/CartItemRow";
import { OrderSummary } from "@/components/patterns/OrderSummary";
import { PromoCodeForm } from "@/components/patterns/PromoCodeForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useCart } from "@/lib/cart/useCart";

import styles from "./Cart.module.scss";

/**
 * Cart: lines the shopper has chosen, with an order summary, promo code and a way to the checkout.
 *
 * @returns The cart page content.
 */
export const Cart = () => {
  const { items, isReady, totals, discountPercent, promoCode, setQuantity, removeItem, applyPromo } = useCart();

  if (!isReady) return <Spinner label="Loading cart" />;

  return (
    <section className={styles.cart}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className={styles.cart__title}>YOUR CART</h1>
      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add something you like and it will show up here."
          action={<Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />}
        />
      ) : (
        <div className={styles.cart__layout}>
          <ul className={styles.cart__items}>
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.color}-${item.size}`}
                item={item}
                onQuantityChange={setQuantity}
                onRemove={removeItem}
              />
            ))}
          </ul>
          <OrderSummary totals={totals} discountPercent={discountPercent}>
            <PromoCodeForm appliedCode={promoCode} discountPercent={discountPercent} onApply={applyPromo} />
            <Button type="primary" size="large" text="Go to Checkout" href="/checkout" typeAttribute="button" />
          </OrderSummary>
        </div>
      )}
    </section>
  );
};
