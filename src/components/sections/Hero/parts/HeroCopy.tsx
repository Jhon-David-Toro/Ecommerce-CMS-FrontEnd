import { Button } from "@/components/ui/Button";

import type { HeroCopyProps } from "../Hero.types";
import { HeroStats } from "./HeroStats";
import styles from "../Hero.module.scss";

/**
 * Hero/Copy: headline, paragraph, call to action and store stats.
 *
 * @param props Component props.
 * @param props.hero Texts and address of the hero.
 * @param props.stats Numbers to count up to, with their labels.
 * @returns The article.
 */
export const HeroCopy = ({ hero, stats }: HeroCopyProps) => (
  <article className={styles.hero__article}>
    <h1 className={styles.hero__article_title}>{hero.title}</h1>
    <p className={styles.hero__article_paragraph}>{hero.paragraph}</p>
    <Button type="primary" text={hero.ctaText} href={hero.ctaHref} size="medium" typeAttribute="button" />
    <HeroStats stats={stats} />
  </article>
);
