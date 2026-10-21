import { useState } from "react";

import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import type { PriceBound } from "../PriceFilter.types";
import { movePriceBound } from "../PriceFilter.utils";

/**
 * Connects the price sliders to the filter store, ignoring the slider that is not being dragged.
 *
 * @returns The price range, the slider activators and the change handler.
 */
export const usePriceFilter = () => {
  const { priceRange, setPriceRange } = useFilterStore();
  const [activeSlider, setActiveSlider] = useState<PriceBound | null>(null);

  /**
   * Applies a slider move when that slider is the one being dragged.
   *
   * @param bound Slider that fired the change.
   * @param value New value of that slider.
   */
  const handleChange = (bound: PriceBound, value: number) => {
    const next = activeSlider === bound ? movePriceBound(priceRange, bound, value) : null;
    if (next) setPriceRange(next);
  };

  return { priceRange, activate: setActiveSlider, deactivate: () => setActiveSlider(null), handleChange };
};
