import { StatsCounter } from "@/components/patterns/StatsCounter";

import type { HeroStatsProps } from "../Hero.types";
import styles from "../Hero.module.scss";

/**
 * Hero/Stats: counters with the store numbers.
 *
 * @param props Component props.
 * @param props.stats Numbers to count up to, with their labels.
 * @returns The stats row.
 */
export const HeroStats = ({ stats }: HeroStatsProps) => (
  <section className={styles.hero__article_stats}>
    {stats.map((stat) => (
      <StatsCounter key={stat.label} {...stat} />
    ))}
  </section>
);
