import Image from "next/image";

import { THUMBS_LIMIT, THUMB_SIZE } from "../OrderHistory.constants";
import type { OrderThumbsProps } from "../OrderHistory.types";
import styles from "../OrderHistory.module.scss";

/**
 * OrderHistory/Thumbs: small pictures of the first products of an order.
 *
 * @param props Component props.
 * @param props.items Lines of the order.
 * @returns The row of pictures.
 */
export const OrderThumbs = ({ items }: OrderThumbsProps) => (
  <ul className={styles.card__thumbs} aria-label="Items">
    {items.slice(0, THUMBS_LIMIT).map((item) => (
      <li key={`${item.productId}-${item.color}-${item.size}`}>
        <Image src={item.image} alt={item.name} {...THUMB_SIZE} className={styles.card__thumb} />
      </li>
    ))}
  </ul>
);
