import type { Brand } from "@/lib/taxonomy/taxonomy.types";

/**
 * Keeps the visible brands that have a logo to show.
 *
 * @param brands Loaded brands; null while they load.
 * @returns The brands for the strip.
 */
export const getLogoBrands = (brands: Brand[] | null) => (brands ?? []).filter((brand) => brand.visible && brand.logo);
