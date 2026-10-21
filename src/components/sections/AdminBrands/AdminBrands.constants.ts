import { buildEmptyValues } from "@/components/patterns/TaxonomyManager";
import type { TaxonomyConfig } from "@/components/patterns/TaxonomyManager";
import { brandRepository, listBrands } from "@/lib/taxonomy/taxonomy.api";
import type { Brand } from "@/lib/taxonomy/taxonomy.types";

import { fromValues, toValues } from "./AdminBrands.utils";

export const BRAND_CONFIG: TaxonomyConfig<Brand> = {
  title: "Brands",
  description: "Labels that products belong to.",
  singular: "brand",
  deleteNote: "Products keep their brand name.",
  imageLabel: "Logo address",
  getImage: (brand) => brand.logo,
  load: listBrands,
  repository: brandRepository,
  emptyValues: buildEmptyValues(),
  toValues,
  toInput: fromValues,
};
