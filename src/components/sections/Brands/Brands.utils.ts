import type { Brand } from "@/lib/taxonomy/taxonomy.types";

/**
 * Keeps the brands that are visible in the store.
 *
 * @param brands Loaded brands; null while they load.
 * @returns The visible brands.
 */
export const getVisibleBrands = (brands: Brand[] | null) => (brands ?? []).filter((brand) => brand.visible);

/**
 * Builds the address of the products of a brand.
 *
 * @param brand Brand to open.
 * @returns The products page narrowed to the brand.
 */
export const getBrandHref = (brand: Brand) => `/products?brand=${encodeURIComponent(brand.name)}`;
