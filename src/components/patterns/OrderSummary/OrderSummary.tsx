import type { FC } from "react";

import type { OrderSummaryProps } from "./OrderSummary.types";
import { SummaryRows } from "./parts/SummaryRows";
import styles from "./OrderSummary.module.scss";

/**
 * OrderSummary: subtotal, discount, delivery fee and total of an order, with room for actions underneath.
 *
 * @param props Component props.
 * @param props.totals Amounts to show.
 * @param props.discountPercent Percentage of the applied promo, shown next to the discount.
 * @param props.children Actions or forms shown under the totals.
 * @returns The summary card.
 */
export const OrderSummary: FC<OrderSummaryProps> = ({ totals, discountPercent, children }) => (
  <aside className={styles.summary} aria-label="Order summary">
    <h2 className={styles.summary__title}>Order Summary</h2>
    <SummaryRows totals={totals} discountPercent={discountPercent} />
    {children}
  </aside>
);
