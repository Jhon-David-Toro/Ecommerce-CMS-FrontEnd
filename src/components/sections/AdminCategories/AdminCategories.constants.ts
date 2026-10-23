import { buildEmptyValues } from "@/components/patterns/TaxonomyManager";
import type { TaxonomyConfig } from "@/components/patterns/TaxonomyManager";
import { categoryRepository, listCategories } from "@/lib/taxonomy/taxonomy.api";
import type { Category } from "@/lib/taxonomy/taxonomy.types";

import { fromValues, toValues } from "./AdminCategories.utils";

export const CATEGORY_CONFIG: TaxonomyConfig<Category> = {
  title: "Categories",
  description: "Groups that shoppers use to browse the catalog.",
  singular: "category",
  deleteNote: "Products keep their category name.",
  imageLabel: "Image address",
  withDescription: true,
  getImage: (category) => category.image,
  load: listCategories,
  repository: categoryRepository,
  emptyValues: buildEmptyValues(),
  toValues,
  toInput: fromValues,
};
