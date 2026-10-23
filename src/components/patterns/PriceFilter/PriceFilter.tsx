"use client";

import type { PriceFilterProps } from "./PriceFilter.types";
import { PriceFilterRange } from "./parts/PriceFilterRange";

/**
 * PriceFilter: price range of the catalog with two overlapping sliders that set the range in the filter store; hidden when there is nothing to choose.
 *
 * @param props Component props.
 * @param props.bounds Lowest and highest price of the catalog, or null when every product costs the same.
 * @returns The price filter.
 */
export const PriceFilter = ({ bounds }: PriceFilterProps) => (bounds ? <PriceFilterRange bounds={bounds} /> : null);
