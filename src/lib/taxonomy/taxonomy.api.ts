import { createRepository } from "@/lib/mock/repository";

import { BRAND_SEEDS, BRAND_STORAGE_KEY, CATEGORY_SEEDS, CATEGORY_STORAGE_KEY } from "./taxonomy.constants";
import type { Brand, Category } from "./taxonomy.types";

export const categoryRepository = createRepository<Category>(CATEGORY_STORAGE_KEY, () =>
  CATEGORY_SEEDS.map((seed, index) => ({ id: index + 1, ...seed, visible: true })),
);

export const brandRepository = createRepository<Brand>(BRAND_STORAGE_KEY, () =>
  BRAND_SEEDS.map((seed, index) => ({ id: index + 1, ...seed, visible: true })),
);

/**
 * Lists the categories.
 *
 * @returns All categories.
 */
export const listCategories = () => categoryRepository.list();

/**
 * Lists the brands.
 *
 * @returns All brands.
 */
export const listBrands = () => brandRepository.list();
