"use client";

import { BrandsBanner } from "@/components/patterns/BrandsBanner";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/lib/content/useSiteContent";

import { HERO_IMAGE_SIZES } from "./Hero.constants";
import { HeroImage } from "./parts/HeroImage";
import { HeroStats } from "./parts/HeroStats";
import styles from "./Hero.module.scss";

/**
 * Hero: headline, call to action, store stats and brand strip over the hero picture, all editable from the admin panel.
 *
 * @returns The hero section.
 */
export const Hero = () => {
  const { hero, stats } = useSiteContent();

  return (
    <section className={styles.hero}>
      <HeroImage src={hero.desktopImage} {...HERO_IMAGE_SIZES.desktop} className={styles.hero__image} />
      <HeroImage src={hero.mobileImage} {...HERO_IMAGE_SIZES.mobile} className={styles.hero__image_mobile} />
      <article className={styles.hero__article}>
        <h1 className={styles.hero__article_title}>{hero.title}</h1>
        <p className={styles.hero__article_paragraph}>{hero.paragraph}</p>
        <Button type="primary" text={hero.ctaText} href={hero.ctaHref} size="medium" typeAttribute="button" />
        <HeroStats stats={stats} />
      </article>
      <BrandsBanner />
    </section>
  );
};
