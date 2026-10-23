import { useState } from "react";

import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import type { PriceBound, UsePriceFilterParams } from "../PriceFilter.types";
import { getPriceGap, movePriceBound } from "../PriceFilter.utils";

/**
 * Connects the price sliders to the filter store, ignoring the slider that is not being dragged.
 * Without a chosen range the whole range of the catalog is selected.
 *
 * @param params Hook parameters.
 * @param params.bounds Lowest and highest price of the catalog.
 * @returns The price range, the slider activators and the change handler.
 */
export const usePriceFilter = ({ bounds }: UsePriceFilterParams) => {
  const { priceRange: chosenRange, setPriceRange } = useFilterStore();
  const [activeSlider, setActiveSlider] = useState<PriceBound | null>(null);
  const priceRange = chosenRange ?? bounds;

  /**
   * Applies a slider move when that slider is the one being dragged.
   *
   * @param bound Slider that fired the change.
   * @param value New value of that slider.
   */
  const handleChange = (bound: PriceBound, value: number) => {
    const next = activeSlider === bound ? movePriceBound(priceRange, bound, value, getPriceGap(bounds)) : null;
    if (next) setPriceRange(next);
  };

  return { priceRange, activate: setActiveSlider, deactivate: () => setActiveSlider(null), handleChange };
};
