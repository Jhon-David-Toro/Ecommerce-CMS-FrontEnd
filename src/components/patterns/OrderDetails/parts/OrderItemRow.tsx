import Image from "next/image";

import { formatPrice } from "@/lib/shared/format/format";

import { ORDER_IMAGE_SIZE } from "../OrderDetails.constants";
import type { OrderItemRowProps } from "../OrderDetails.types";
import styles from "../OrderDetails.module.scss";

/**
 * OrderDetails/ItemRow: picture, name, options and line total of one order line.
 *
 * @param props Component props.
 * @param props.item Order line.
 * @returns The list item.
 */
export const OrderItemRow = ({ item }: OrderItemRowProps) => (
  <li className={styles.order__item}>
    <Image src={item.image} alt={item.name} {...ORDER_IMAGE_SIZE} className={styles.order__image} />
    <div>
      <p className={styles.order__name}>{item.name}</p>
      <p className={styles.order__option}>
        {item.size} · {item.color} · x{item.quantity}
      </p>
    </div>
    <p className={styles.order__price}>{formatPrice(item.price * item.quantity)}</p>
  </li>
);
