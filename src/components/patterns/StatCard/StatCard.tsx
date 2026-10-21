import type { FC } from "react";

import type { StatCardProps } from "./StatCard.types";
import styles from "./StatCard.module.scss";

/**
 * StatCard: big number with a label, used in dashboards.
 *
 * @param props Component props.
 * @param props.label What the number measures.
 * @param props.value The number, already formatted.
 * @param props.hint Small note under the number.
 * @returns The card.
 */
export const StatCard: FC<StatCardProps> = ({ label, value, hint }) => (
  <article className={styles.card}>
    <p className={styles.card__label}>{label}</p>
    <p className={styles.card__value}>{value}</p>
    {hint && <p className={styles.card__hint}>{hint}</p>}
  </article>
);
