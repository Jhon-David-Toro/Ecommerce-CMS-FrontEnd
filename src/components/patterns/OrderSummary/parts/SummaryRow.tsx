import { cx } from "@/lib/shared/classnames/cx";

import type { SummaryRowProps } from "../OrderSummary.types";
import styles from "../OrderSummary.module.scss";

/**
 * OrderSummary/Row: one label and amount of the summary.
 *
 * @param props Component props.
 * @param props.label Name of the amount.
 * @param props.value Amount, already formatted.
 * @param props.tone Style of the row: normal, discount or total.
 * @returns The row.
 */
export const SummaryRow = ({ label, value, tone = "normal" }: SummaryRowProps) => (
  <div className={cx(styles.summary__row, styles[`summary__row_${tone}`])}>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);
