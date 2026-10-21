import type { FC } from "react";

import { formatPrice } from "@/lib/shared/format/format";

import type { OrderSummaryProps } from "./OrderSummary.types";
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
    <dl className={styles.summary__list}>
      <div className={styles.summary__row}>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className={styles.summary__row}>
          <dt>Discount (-{discountPercent}%)</dt>
          <dd className={styles.summary__discount}>-{formatPrice(totals.discount)}</dd>
        </div>
      )}
      <div className={styles.summary__row}>
        <dt>Delivery Fee</dt>
        <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
      </div>
      <div className={styles.summary__total}>
        <dt>Total</dt>
        <dd>{formatPrice(totals.total)}</dd>
      </div>
    </dl>
    {children}
  </aside>
);
