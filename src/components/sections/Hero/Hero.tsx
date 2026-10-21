import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import styles from './Hero.module.scss';
import Image from 'next/image';
import { StatsCounter } from "@/components/patterns/StatsCounter";
import { BrandsBanner } from "@/components/patterns/BrandsBanner";
import { Skeleton } from "@/components/ui/Skeleton";

export const Hero = () => {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <section className={styles.hero}>

      {!desktopLoaded && <Skeleton />}

      <Image
        className={styles.hero__image}
        src="https://res.cloudinary.com/dxspvj1rj/image/upload/v1743273819/hero_oqglpz.png"
        alt="Fashion collection"
        width={1440}
        height={663}
        priority
        onLoad={() => setDesktopLoaded(true)}
      />
      
      {!mobileLoaded && <Skeleton />}

      <Image
        className={styles.hero__image_mobile}
        src="https://res.cloudinary.com/dxspvj1rj/image/upload/v1743282458/hero-mobile_pjl4my.svg"
        alt="Fashion collection"
        width={390}
        height={448}
        priority
        onLoad={() => setMobileLoaded(true)}
      />
      
      <article className={styles.hero__article}>
        <h1 className={styles.hero__article_title}>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p  className={styles.hero__article_paragraph}>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
        <Button type="primary" text="Shop Now" href='/products' size="medium" typeAttribute='button'/>

        <section className={styles.hero__article_stats}>
          <StatsCounter endValue={200} label="International Brands" />
          <StatsCounter endValue={2000} label="High-Quality Products" />
          <StatsCounter endValue={30000} label="Happy Customers" />
        </section>
      </article>
      <BrandsBanner />
    </section>
  )
}
