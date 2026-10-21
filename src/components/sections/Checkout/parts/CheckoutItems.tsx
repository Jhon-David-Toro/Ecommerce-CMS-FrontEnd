import Image from "next/image";

import { getItemKey } from "@/lib/cart/cart.utils";
import { formatPrice } from "@/lib/shared/format/format";

import { ITEM_IMAGE_SIZE } from "../Checkout.constants";
import type { CheckoutItemsProps } from "../Checkout.types";
import styles from "../Checkout.module.scss";

/**
 * Checkout/Items: picture, name, options and line total of each product in the order.
 *
 * @param props Component props.
 * @param props.items Cart lines.
 * @returns The list.
 */
export const CheckoutItems = ({ items }: CheckoutItemsProps) => (
  <ul className={styles.checkout__items} aria-label="Items in your order">
    {items.map((item) => (
      <li key={getItemKey(item)} className={styles.checkout__item}>
        <Image src={item.image} alt="" {...ITEM_IMAGE_SIZE} className={styles.checkout__itemImage} />
        <div>
          <p className={styles.checkout__itemName}>{item.name}</p>
          <p className={styles.checkout__itemOptions}>
            {item.size} · {item.color} · x{item.quantity}
          </p>
        </div>
        <p className={styles.checkout__itemPrice}>{formatPrice(item.price * item.quantity)}</p>
      </li>
    ))}
  </ul>
);
