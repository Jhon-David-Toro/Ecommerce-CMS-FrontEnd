"use client";

import { useState } from "react";

import { FilterSection } from "@/components/patterns/FilterSection";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import { PRICE_BOUNDS } from "./PriceFilter.constants";
import type { PriceBound } from "./PriceFilter.types";
import { movePriceBound } from "./PriceFilter.utils";
import { PriceSlider } from "./parts/PriceSlider";
import styles from "./PriceFilter.module.scss";

/**
 * PriceFilter: two overlapping sliders that set the price range in the filter store.
 *
 * @returns The price filter.
 */
export const PriceFilter = () => {
  const { priceRange, setPriceRange } = useFilterStore();
  const [activeSlider, setActiveSlider] = useState<PriceBound | null>(null);

  /**
   * Applies a slider move, ignoring the slider that is not being dragged.
   *
   * @param bound Slider that fired the change.
   * @param value New value of that slider.
   */
  const handleChange = (bound: PriceBound, value: number) => {
    const next = activeSlider === bound ? movePriceBound(priceRange, bound, value) : null;
    if (next) setPriceRange(next);
  };

  return (
    <FilterSection title="Price">
      <section className={styles.price}>
        <section className={styles.price__range}>
          {PRICE_BOUNDS.map((bound) => (
            <PriceSlider
              key={bound}
              bound={bound}
              priceRange={priceRange}
              onActivate={setActiveSlider}
              onDeactivate={() => setActiveSlider(null)}
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
