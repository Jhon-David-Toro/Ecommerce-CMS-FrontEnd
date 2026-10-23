import type { PriceRange } from "@/lib/catalog/filters/filters.types";

import { MIN_PRICE_GAP, PRICE_BOUND } from "./PriceFilter.constants";
import type { PriceBound } from "./PriceFilter.types";

/**
 * Moves one end of the price range, keeping a minimum gap between both ends.
 *
 * @param range Current price range.
 * @param bound End of the range being moved.
 * @param value New value for that end.
 * @param gap Closest the two ends may get.
 * @returns The new range, or null when the move would squeeze the ends too close.
 */
export const movePriceBound = (range: PriceRange, bound: PriceBound, value: number, gap = MIN_PRICE_GAP): PriceRange | null => {
  const [min, max] = range;

  if (bound === PRICE_BOUND.min) return value <= max - gap ? [value, max] : null;
  return value >= min + gap ? [min, value] : null;
};

/**
 * Picks the closest the two ends may get: the usual gap, or less when the prices of the catalog are packed together.
 *
 * @param bounds Lowest and highest price of the catalog.
 * @returns The minimum gap between both ends.
 */
export const getPriceGap = (bounds: PriceRange) => Math.max(1, Math.min(MIN_PRICE_GAP, Math.floor((bounds[1] - bounds[0]) / 4)));
