import Link from "next/link";

import { formatPrice } from "@/lib/shared/format/format";

import type { CartItemBodyProps } from "../CartItemRow.types";
import styles from "../CartItemRow.module.scss";

/**
 * CartItemRow/Body: name, options and line total of a cart line.
 *
 * @param props Component props.
 * @param props.item Cart line to show.
 * @returns The text block.
 */
export const CartItemBody = ({ item }: CartItemBodyProps) => (
  <div className={styles.row__body}>
    <Link href={`/product-details/${item.productId}`} className={styles.row__name}>
      {item.name}
    </Link>
    <p className={styles.row__option}>Size: {item.size}</p>
    <p className={styles.row__option}>Color: {item.color}</p>
    <p className={styles.row__price}>{formatPrice(item.price * item.quantity)}</p>
  </div>
);
