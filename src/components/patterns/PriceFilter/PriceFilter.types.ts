import type { PriceRange } from "@/lib/catalog/filters/filters.types";

import type { PRICE_BOUNDS } from "./PriceFilter.constants";

export type PriceBound = (typeof PRICE_BOUNDS)[number];

export interface PriceSliderProps {
  bound: PriceBound;
  priceRange: PriceRange;
  bounds: PriceRange;
  onActivate: (bound: PriceBound) => void;
  onDeactivate: () => void;
  onChange: (bound: PriceBound, value: number) => void;
}

export interface PriceFilterProps {
  bounds: PriceRange | null;
}

export interface UsePriceFilterParams {
  bounds: PriceRange;
}
