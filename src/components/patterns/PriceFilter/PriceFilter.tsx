"use client";

import { FilterSection } from "@/components/patterns/FilterSection";

import { usePriceFilter } from "./hooks/usePriceFilter";
import { PRICE_BOUNDS } from "./PriceFilter.constants";
import { PriceSlider } from "./parts/PriceSlider";
import styles from "./PriceFilter.module.scss";

/**
 * PriceFilter: two overlapping sliders that set the price range in the filter store.
 *
 * @returns The price filter.
 */
export const PriceFilter = () => {
  const { priceRange, activate, deactivate, handleChange } = usePriceFilter();

  return (
    <FilterSection title="Price">
      <section className={styles.price}>
        <section className={styles.price__range}>
          {PRICE_BOUNDS.map((bound) => (
            <PriceSlider
              key={bound}
              bound={bound}
              priceRange={priceRange}
              onActivate={activate}
              onDeactivate={deactivate}
              onChange={handleChange}
            />
          ))}
        </section>
        <div className={styles.price__labels}>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </section>
    </FilterSection>
  );
};
