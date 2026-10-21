import { useWindowWidth } from "@/lib/shared/dom/useWindowWidth";

import { CUSTOMER_REVIEWS } from "./HappyCustomers.constants";
import { getItemsPerSlide } from "./HappyCustomers.utils";
import { useSlider } from "./hooks/useSlider";
import { HappyCustomersHeader } from "./parts/HappyCustomersHeader";
import { HappyCustomersTrack } from "./parts/HappyCustomersTrack";
import styles from "./HappyCustomers.module.scss";

/**
 * HappyCustomers: looping slider of customer reviews.
 *
 * @returns The reviews section.
 */
export const HappyCustomers = () => {
  const itemsPerSlide = getItemsPerSlide(useWindowWidth());
  const { currentSlide, next, previous, isStatic } = useSlider({ total: CUSTOMER_REVIEWS.length, itemsPerSlide });

  return (
    <section className={styles.happy}>
      <HappyCustomersHeader onPrevious={previous} onNext={next} disabled={isStatic} />
      <HappyCustomersTrack offsetPercent={(currentSlide * 100) / itemsPerSlide} />
    </section>
  );
};
