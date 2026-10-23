export const MIN_PRICE_GAP = 10;

export const PRICE_BOUND = { min: "min", max: "max" } as const;

export const PRICE_BOUNDS = [PRICE_BOUND.min, PRICE_BOUND.max] as const;

export const PRICE_BOUND_INDEX = { min: 0, max: 1 } as const;

export const PRICE_BOUND_LABELS = { min: "Minimum price", max: "Maximum price" } as const;
