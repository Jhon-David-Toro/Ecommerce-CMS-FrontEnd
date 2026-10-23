import type { HomeCategoryItem } from "@/components/patterns/HomeCategory/HomeCategory.types";
import type { Category } from "@/lib/taxonomy/taxonomy.types";

import { GRID_COLUMNS, WIDE_POSITIONS } from "./HomeCategories.constants";

/**
 * Builds the address of the products of a category.
 *
 * @param category Category to open.
 * @returns The products page narrowed to the category.
 */
export const getCategoryHref = (category: Category) => `/products?category=${encodeURIComponent(category.name)}`;

/**
 * Turns the visible categories that have a picture into cards, making the second and third of every row of four wide.
 *
 * @param categories Loaded categories; null while they load.
 * @returns The cards for the home page.
 */
export const toHomeCategoryItems = (categories: Category[] | null): HomeCategoryItem[] =>
  (categories ?? [])
    .filter((category) => category.visible && category.image)
    .map((category, index) => ({
      title: category.name,
      image: category.image,
      link: getCategoryHref(category),
      twoColumn: (WIDE_POSITIONS as readonly number[]).includes(index % GRID_COLUMNS),
    }));
