import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { QuantityControl } from "@/components/ui/QuantityControl";
import { getItemKey } from "@/lib/cart/cart.utils";
import { formatPrice } from "@/lib/shared/format/format";

import { CART_IMAGE_SIZE } from "./CartItemRow.constants";
import type { CartItemRowProps } from "./CartItemRow.types";
import styles from "./CartItemRow.module.scss";

/**
 * CartItemRow: one line of the cart with picture, options, price, quantity control and remove button.
 *
 * @param props Component props.
 * @param props.item Cart line to show.
 * @param props.onQuantityChange Called with the line key and the new quantity.
 * @param props.onRemove Called with the line key when the shopper removes it.
 * @returns The cart line.
 */
export const CartItemRow: FC<CartItemRowProps> = ({ item, onQuantityChange, onRemove }) => {
  const key = getItemKey(item);

  return (
    <li className={styles.row}>
      <Image src={item.image} alt={item.name} {...CART_IMAGE_SIZE} className={styles.row__image} />
      <div className={styles.row__body}>
        <Link href={`/product-details/${item.productId}`} className={styles.row__name}>
          {item.name}
        </Link>
        <p className={styles.row__option}>Size: {item.size}</p>
        <p className={styles.row__option}>Color: {item.color}</p>
        <p className={styles.row__price}>{formatPrice(item.price * item.quantity)}</p>
      </div>
      <button type="button" className={styles.row__remove} aria-label={`Remove ${item.name}`} onClick={() => onRemove(key)}>
        <TrashIcon className={styles.row__removeIcon} />
      </button>
      <div className={styles.row__quantity}>
        <QuantityControl quantity={item.quantity} onQuantityChange={(quantity) => onQuantityChange(key, quantity)} />
      </div>
    </li>
  );
};
