import { ActionEmptyState } from "@/components/patterns/ActionEmptyState";

import { BRANDS_EMPTY } from "../Brands.constants";
import type { BrandsGridProps } from "../Brands.types";
import { BrandsGrid } from "./BrandsGrid";

/**
 * Brands/List: the grid of brands, or a way to the whole catalog while there are none.
 *
 * @param props Component props.
 * @param props.brands Brands to show.
 * @returns The grid or the empty message.
 */
export const BrandsList = ({ brands }: BrandsGridProps) =>
  brands.length ? <BrandsGrid brands={brands} /> : <ActionEmptyState {...BRANDS_EMPTY} />;
