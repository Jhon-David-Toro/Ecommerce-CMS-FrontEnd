"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";

import { COUNTER_LOCALE, DEFAULT_DURATION_MS } from "./StatsCounter.constants";
import type { StatsCounterProps } from "./StatsCounter.types";
import { startCounter } from "./StatsCounter.utils";
import styles from "./StatsCounter.module.scss";

/**
 * StatsCounter: number that counts up to its final value, with a label.
 *
 * @param props Component props.
 * @param props.endValue Final value.
 * @param props.label Text under the number.
 * @param props.duration Time the count takes, in milliseconds.
 * @returns The counter.
 */
export const StatsCounter: FC<StatsCounterProps> = ({ endValue, label, duration = DEFAULT_DURATION_MS }) => {
  const [count, setCount] = useState(0);

  useEffect(() => startCounter({ endValue, duration, onChange: setCount }), [endValue, duration]);

  return (
    <section className={styles.stat}>
      <h3 className={styles.stat__number}>{count.toLocaleString(COUNTER_LOCALE)}+</h3>
      <p className={styles.stat__label}>{label}</p>
    </section>
  );
};
