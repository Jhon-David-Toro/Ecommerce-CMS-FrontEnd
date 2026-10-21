import { CartItemRow } from "@/components/patterns/CartItemRow";
import { OrderSummary } from "@/components/patterns/OrderSummary";
import { PromoCodeForm } from "@/components/patterns/PromoCodeForm";
import { Button } from "@/components/ui/Button";
import { getItemKey } from "@/lib/cart/cart.utils";

import type { CartLayoutProps } from "../Cart.types";
import styles from "../Cart.module.scss";

/**
 * Cart/Layout: the cart lines next to the order summary with the promo code and the checkout button.
 *
 * @param props Component props.
 * @param props.cart State and actions of the cart.
 * @returns The two columns.
 */
export const CartLayout = ({ cart }: CartLayoutProps) => (
  <div className={styles.cart__layout}>
    <ul className={styles.cart__items}>
      {cart.items.map((item) => (
        <CartItemRow key={getItemKey(item)} item={item} onQuantityChange={cart.setQuantity} onRemove={cart.removeItem} />
      ))}
    </ul>
    <OrderSummary totals={cart.totals} discountPercent={cart.discountPercent}>
      <PromoCodeForm appliedCode={cart.promoCode} discountPercent={cart.discountPercent} onApply={cart.applyPromo} />
      <Button type="primary" size="large" text="Go to Checkout" href="/checkout" typeAttribute="button" />
    </OrderSummary>
  </div>
);
