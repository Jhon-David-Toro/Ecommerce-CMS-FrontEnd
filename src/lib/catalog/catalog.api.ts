import { createRepository } from "@/lib/mock/repository";

import { PRODUCT_STATUSES, PRODUCT_STORAGE_KEY } from "./catalog.constants";
import { buildSeedProducts } from "./catalog.seed";
import type { Product, ProductInput, ProductListOptions } from "./product.types";

export const productRepository = createRepository<Product>(PRODUCT_STORAGE_KEY, buildSeedProducts);

/**
 * Lists products; drafts are only included when asked for (admin screens).
 *
 * @param options List options.
 * @param options.includeDrafts Includes products that are not published.
 * @returns The products.
 */
export const listProducts = async ({ includeDrafts = false }: ProductListOptions = {}) => {
  const products = await productRepository.list();
  return includeDrafts ? products : products.filter((product) => product.status === PRODUCT_STATUSES.published);
};

/**
 * Finds one product.
 *
 * @param id Product id.
 * @returns The product, or null when it does not exist.
 */
export const getProduct = (id: number) => productRepository.getById(id);

/**
 * Creates a product, or updates it when an id is given.
 *
 * @param input Product data.
 * @param id Id of the product to update.
 * @returns The saved product.
 */
export const saveProduct = (input: ProductInput, id?: number) =>
  id ? productRepository.update(id, input) : productRepository.create(input);

/**
 * Deletes a product.
 *
 * @param id Product id.
 */
export const deleteProduct = (id: number) => productRepository.remove(id);
