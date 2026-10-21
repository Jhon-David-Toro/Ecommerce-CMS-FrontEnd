import type { OrderItemListProps } from "../OrderDetails.types";
import { getItemKey } from "../OrderDetails.utils";
import { OrderItemRow } from "./OrderItemRow";
import styles from "../OrderDetails.module.scss";

/**
 * OrderDetails/ItemList: the lines of an order.
 *
 * @param props Component props.
 * @param props.items Order lines.
 * @returns The list.
 */
export const OrderItemList = ({ items }: OrderItemListProps) => (
  <ul className={styles.order__items} aria-label="Items">
    {items.map((item) => (
      <OrderItemRow key={getItemKey(item)} item={item} />
    ))}
  </ul>
);
