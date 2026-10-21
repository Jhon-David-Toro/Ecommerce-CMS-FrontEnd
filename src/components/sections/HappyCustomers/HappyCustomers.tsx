import type { CSSProperties } from "react";

import { useWindowWidth } from "@/lib/shared/dom/useWindowWidth";

import { HappyCard } from "@/components/patterns/HappyCard";
import { SliderButton } from "@/components/ui/SliderButton";
import { CUSTOMER_REVIEWS } from "./HappyCustomers.constants";
import { getItemsPerSlide } from "./HappyCustomers.utils";
import { useSlider } from "./hooks/useSlider";
import styles from "./HappyCustomers.module.scss";

/**
 * Happy customers: looping slider of customer reviews.
 *
 * @returns The reviews section.
 */
export const HappyCustomers = () => {
  const itemsPerSlide = getItemsPerSlide(useWindowWidth());
  const { currentSlide, next, previous, isStatic } = useSlider({ total: CUSTOMER_REVIEWS.length, itemsPerSlide });
  const trackStyle = { "--slide-offset": `${(currentSlide * 100) / itemsPerSlide}%` } as CSSProperties;

  return (
    <section className={styles.happy}>
      <header className={styles.happy__title}>
        <span className={styles.happy__title_span}>OUR HAPPY CUSTOMERS</span>
        <div className={styles.happy__title_button}>
          <SliderButton direction="left" onClick={previous} disabled={isStatic} />
          <SliderButton direction="right" onClick={next} disabled={isStatic} />
        </div>
      </header>
      <div className={styles.happy__container}>
        <ul className={styles.happy__container_track} style={trackStyle}>
          {CUSTOMER_REVIEWS.map((review) => (
            <li className={styles.happy__container_slide} key={review.name}>
              <HappyCard {...review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
