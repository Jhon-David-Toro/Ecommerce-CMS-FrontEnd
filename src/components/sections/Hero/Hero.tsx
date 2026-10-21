import { BrandsBanner } from "@/components/patterns/BrandsBanner";
import { StatsCounter } from "@/components/patterns/StatsCounter";
import { Button } from "@/components/ui/Button";

import { HERO_IMAGES, HERO_STATS } from "./Hero.constants";
import { HeroImage } from "./parts/HeroImage";
import styles from "./Hero.module.scss";

/**
 * Hero: headline, call to action, store stats and brand strip over the hero picture.
 *
 * @returns The hero section.
 */
export const Hero = () => (
  <section className={styles.hero}>
    <HeroImage {...HERO_IMAGES.desktop} className={styles.hero__image} />
    <HeroImage {...HERO_IMAGES.mobile} className={styles.hero__image_mobile} />
    <article className={styles.hero__article}>
      <h1 className={styles.hero__article_title}>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      <p className={styles.hero__article_paragraph}>
        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense
        of style.
      </p>
      <Button type="primary" text="Shop Now" href="/products" size="medium" typeAttribute="button" />
      <section className={styles.hero__article_stats}>
        {HERO_STATS.map((stat) => (
          <StatsCounter key={stat.label} {...stat} />
        ))}
      </section>
    </article>
    <BrandsBanner />
  </section>
);
