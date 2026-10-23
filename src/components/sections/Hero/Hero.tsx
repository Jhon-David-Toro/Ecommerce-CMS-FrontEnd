"use client";

import { BrandsBanner } from "@/components/patterns/BrandsBanner";
import { useSiteContent } from "@/lib/content/useSiteContent";

import { HeroCopy } from "./parts/HeroCopy";
import { HeroImages } from "./parts/HeroImages";
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
      <HeroImages desktopImage={hero.desktopImage} mobileImage={hero.mobileImage} />
      <HeroCopy hero={hero} stats={stats} />
      <BrandsBanner />
    </section>
  );
};
