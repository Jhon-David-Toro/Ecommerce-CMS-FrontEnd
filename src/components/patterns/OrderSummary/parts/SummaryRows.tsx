import { formatPrice } from "@/lib/shared/format/format";

import type { SummaryRowsProps } from "../OrderSummary.types";
import { formatShipping } from "../OrderSummary.utils";
import { SummaryRow } from "./SummaryRow";
import styles from "../OrderSummary.module.scss";

/**
 * OrderSummary/Rows: the lines of the summary; the discount line only shows when there is a discount.
 *
 * @param props Component props.
 * @param props.totals Amounts to show.
 * @param props.discountPercent Percentage of the applied promo.
 * @returns The list of amounts.
 */
export const SummaryRows = ({ totals, discountPercent }: SummaryRowsProps) => (
  <dl className={styles.summary__list}>
    <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
    {totals.discount > 0 && (
      <SummaryRow label={`Discount (-${discountPercent}%)`} value={`-${formatPrice(totals.discount)}`} tone="discount" />
    )}
    <SummaryRow label="Delivery Fee" value={formatShipping(totals.shipping)} />
    <SummaryRow label="Total" value={formatPrice(totals.total)} tone="total" />
  </dl>
);
