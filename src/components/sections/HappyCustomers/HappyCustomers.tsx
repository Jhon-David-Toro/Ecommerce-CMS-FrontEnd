"use client";

import { listLatestReviews } from "@/lib/catalog/reviews.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useWindowWidth } from "@/lib/shared/dom/useWindowWidth";

import { LATEST_REVIEWS_LIMIT } from "./HappyCustomers.constants";
import { getItemsPerSlide } from "./HappyCustomers.utils";
import { useSlider } from "./hooks/useSlider";
import { HappyCustomersHeader } from "./parts/HappyCustomersHeader";
import { HappyCustomersTrack } from "./parts/HappyCustomersTrack";
import styles from "./HappyCustomers.module.scss";

/**
 * HappyCustomers: looping slider with the newest approved reviews of the store; it stays hidden until there is one.
 *
 * @returns The reviews section, or nothing without reviews.
 */
export const HappyCustomers = () => {
  const { data } = useQuery(listLatestReviews, LATEST_REVIEWS_LIMIT);
  const reviews = data ?? [];
  const itemsPerSlide = getItemsPerSlide(useWindowWidth());
  const { currentSlide, next, previous, isStatic } = useSlider({ total: reviews.length, itemsPerSlide });

  if (!reviews.length) return null;

  return (
    <section className={styles.happy}>
      <HappyCustomersHeader onPrevious={previous} onNext={next} disabled={isStatic} />
      <HappyCustomersTrack reviews={reviews} offsetPercent={(currentSlide * 100) / itemsPerSlide} />
    </section>
  );
};
