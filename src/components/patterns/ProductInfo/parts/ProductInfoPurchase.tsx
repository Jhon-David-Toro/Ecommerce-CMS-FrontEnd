import Link from "next/link";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { clampQuantity } from "@/lib/cart/cart.utils";

import type { ProductInfoPurchaseProps } from "../ProductInfo.types";
import styles from "../ProductInfo.module.scss";

/**
 * ProductInfo/Purchase: quantity control and the add to cart button, with an out of stock state and a confirmation.
 *
 * @param props Component props.
 * @param props.quantity Current quantity.
 * @param props.stock Units in stock.
 * @param props.added Shows the confirmation after adding to the cart.
 * @param props.onQuantityChange Receives the new quantity.
 * @param props.onAdd Called when the shopper adds the product to the cart.
 * @returns The purchase row.
 */
export const ProductInfoPurchase = ({ quantity, stock, added, onQuantityChange, onAdd }: ProductInfoPurchaseProps) => {
  const outOfStock = stock <= 0;

  return (
    <>
      <section className={styles.product__addToCart}>
        <QuantityControl quantity={quantity} onQuantityChange={(next) => onQuantityChange(clampQuantity(next, stock))} />
        <Button
          id="add-to-cart"
          type="primary"
          text={outOfStock ? "Out of stock" : "Add to Cart"}
          size="extra-large"
          typeAttribute="button"
          disabled={outOfStock}
          onClick={onAdd}
        />
      </section>
      {added && (
        <Alert tone="success">
          Added to your cart. <Link href="/cart">View cart</Link>
        </Alert>
      )}
    </>
  );
};
