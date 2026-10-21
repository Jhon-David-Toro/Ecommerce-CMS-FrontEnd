import { PRODUCT_ROUTE } from "./ProductCard.constants";

/**
 * Builds the address of a product page.
 *
 * @param id Product id.
 * @returns The path of the product page.
 */
export const getProductHref = (id: number | string) => `${PRODUCT_ROUTE}/${id}`;
