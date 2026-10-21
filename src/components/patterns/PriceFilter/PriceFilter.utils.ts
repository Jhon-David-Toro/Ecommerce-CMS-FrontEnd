import type { PriceRange } from "@/lib/catalog/filters/filters.types";

import { MIN_PRICE_GAP, PRICE_BOUND } from "./PriceFilter.constants";
import type { PriceBound } from "./PriceFilter.types";

/**
 * Moves one end of the price range, keeping a minimum gap between both ends.
 *
 * @param range Current price range.
 * @param bound End of the range being moved.
 * @param value New value for that end.
 * @returns The new range, or null when the move would squeeze the ends too close.
 */
export const movePriceBound = (range: PriceRange, bound: PriceBound, value: number): PriceRange | null => {
  const [min, max] = range;

  if (bound === PRICE_BOUND.min) return value <= max - MIN_PRICE_GAP ? [value, max] : null;
  return value >= min + MIN_PRICE_GAP ? [min, value] : null;
};
