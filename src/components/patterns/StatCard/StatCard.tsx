import type { FC } from "react";

import type { StatCardProps } from "./StatCard.types";
import styles from "./StatCard.module.scss";

/**
 * StatCard: big number with a label and an optional icon chip, used in dashboards.
 *
 * @param props Component props.
 * @param props.label What the number measures.
 * @param props.value The number, already formatted.
 * @param props.hint Small note under the number.
 * @param props.icon Icon drawn in the chip at the top right.
 * @returns The card.
 */
export const StatCard: FC<StatCardProps> = ({ label, value, hint, icon: Icon }) => (
  <article className={styles.card}>
    <div className={styles.card__head}>
      <p className={styles.card__label}>{label}</p>
      {Icon && (
        <span className={styles.card__icon} aria-hidden="true">
          <Icon />
        </span>
      )}
    </div>
    <p className={styles.card__value}>{value}</p>
    {hint && <p className={styles.card__hint}>{hint}</p>}
  </article>
);
