import { Button } from "@/components/ui/Button";
import { QuantityControl } from "@/components/ui/QuantityControl";

import type { ProductInfoPurchaseProps } from "../ProductInfo.types";
import styles from "../ProductInfo.module.scss";

/**
 * ProductInfo/Purchase: quantity control and the add to cart button.
 *
 * @param props Component props.
 * @param props.quantity Current quantity.
 * @param props.setQuantity Receives the new quantity.
 * @returns The purchase row.
 */
export const ProductInfoPurchase = ({ quantity, setQuantity }: ProductInfoPurchaseProps) => (
  <section className={styles.product__addToCart}>
    <QuantityControl quantity={quantity} setQuantity={setQuantity} />
    <Button id="add-to-cart" type="primary" text="Add to Cart" size="extra-large" typeAttribute="button" />
  </section>
);
