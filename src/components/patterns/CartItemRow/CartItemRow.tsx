import Image from "next/image";
import type { FC } from "react";

import { QuantityControl } from "@/components/ui/QuantityControl";
import { getItemKey } from "@/lib/cart/cart.utils";

import { CART_IMAGE_SIZE } from "./CartItemRow.constants";
import type { CartItemRowProps } from "./CartItemRow.types";
import { CartItemBody } from "./parts/CartItemBody";
import { RemoveButton } from "./parts/RemoveButton";
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
      <CartItemBody item={item} />
      <RemoveButton name={item.name} itemKey={key} onRemove={onRemove} />
      <div className={styles.row__quantity}>
        <QuantityControl quantity={item.quantity} onQuantityChange={(quantity) => onQuantityChange(key, quantity)} />
      </div>
    </li>
  );
};
