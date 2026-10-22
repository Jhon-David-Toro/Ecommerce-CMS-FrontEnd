import { useAuthStore } from "@/lib/auth/authStore";
import { createRepository } from "@/lib/mock/repository";
import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";
import { createRemoteRepository } from "@/lib/shared/http/remoteRepository";

import { BRAND_SEEDS, BRAND_STORAGE_KEY, CATEGORY_SEEDS, CATEGORY_STORAGE_KEY } from "./taxonomy.constants";
import type { Brand, Category } from "./taxonomy.types";

/**
 * Gives the path that lists a taxonomy: administrators see every record, everybody else only the visible ones.
 *
 * @param resource Name of the resource in the API, such as "categories".
 * @returns A function that gives the path at the moment of the request.
 */
export const taxonomyListPath = (resource: string) => () =>
  useAuthStore.getState().user?.role === "admin" ? `/api/admin/${resource}` : `/api/public/${resource}`;

export const categoryRepository = IS_API_ENABLED
  ? createRemoteRepository<Category>({ listPath: taxonomyListPath("categories"), itemPath: "/api/admin/categories" })
  : createRepository<Category>(CATEGORY_STORAGE_KEY, () =>
      CATEGORY_SEEDS.map((seed, index) => ({ id: index + 1, ...seed, visible: true })),
    );

export const brandRepository = IS_API_ENABLED
  ? createRemoteRepository<Brand>({ listPath: taxonomyListPath("brands"), itemPath: "/api/admin/brands" })
  : createRepository<Brand>(BRAND_STORAGE_KEY, () => BRAND_SEEDS.map((seed, index) => ({ id: index + 1, ...seed, visible: true })));

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
