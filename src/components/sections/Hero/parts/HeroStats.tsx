import { StatsCounter } from "@/components/patterns/StatsCounter";

import { HERO_STATS } from "../Hero.constants";
import styles from "../Hero.module.scss";

/**
 * Hero/Stats: counters with the store numbers.
 *
 * @returns The stats row.
 */
export const HeroStats = () => (
  <section className={styles.hero__article_stats}>
    {HERO_STATS.map((stat) => (
      <StatsCounter key={stat.label} {...stat} />
    ))}
  </section>
);
