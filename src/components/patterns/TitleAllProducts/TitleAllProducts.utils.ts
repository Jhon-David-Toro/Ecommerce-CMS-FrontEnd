import { DEFAULT_TITLE, NO_PRODUCTS_TEXT } from "./TitleAllProducts.constants";
import type { ShowingTextParams } from "./TitleAllProducts.types";

/**
 * Builds the "Showing x-y of z Products" text for the current page.
 *
 * @param params Pagination numbers.
 * @param params.currentPage Current page, starting at 1.
 * @param params.productsPerPage Products on each page.
 * @param params.totalProducts Total products after filtering.
 * @returns The text, or a notice when there are no products.
 */
export const getShowingText = ({ currentPage, productsPerPage, totalProducts }: ShowingTextParams) => {
  if (totalProducts === 0) return NO_PRODUCTS_TEXT;

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

  return `Showing ${startIndex}-${endIndex} of ${totalProducts} Products`;
};

/**
 * Picks the page title: the selected category name or a generic title.
 *
 * @param categoryName Name of the single selected category, possibly empty.
 * @returns The title to show.
 */
export const getTitle = (categoryName: string) => categoryName.trim() || DEFAULT_TITLE;
