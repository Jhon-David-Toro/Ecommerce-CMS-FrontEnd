import { getItemKey } from "@/lib/cart/cart.utils";

import type { CheckoutItemsProps } from "../Checkout.types";
import styles from "../Checkout.module.scss";

/**
 * Checkout/Items: one line of text for each product in the order.
 *
 * @param props Component props.
 * @param props.items Cart lines.
 * @returns The list.
 */
export const CheckoutItems = ({ items }: CheckoutItemsProps) => (
  <ul className={styles.checkout__items} aria-label="Items in your order">
    {items.map((item) => (
      <li key={getItemKey(item)}>
        {item.quantity} x {item.name} ({item.size}, {item.color})
      </li>
    ))}
  </ul>
);
