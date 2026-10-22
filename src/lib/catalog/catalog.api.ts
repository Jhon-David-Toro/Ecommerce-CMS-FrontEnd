import { createRepository } from "@/lib/mock/repository";
import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import { PRODUCT_STATUSES, PRODUCT_STORAGE_KEY } from "./catalog.constants";
import * as remote from "./catalog.remote";
import { buildSeedProducts } from "./catalog.seed";
import type { Product, ProductInput, ProductListOptions } from "./product.types";

const browserRepository = createRepository<Product>(PRODUCT_STORAGE_KEY, buildSeedProducts);

export const productRepository = IS_API_ENABLED ? remote.productRepository : browserRepository;

/**
 * Lists products; drafts are only included when asked for (admin screens).
 *
 * @param options List options.
 * @param options.includeDrafts Includes products that are not published.
 * @returns The products.
 */
const listFromBrowser = async ({ includeDrafts = false }: ProductListOptions = {}) => {
  const products = await browserRepository.list();
  return includeDrafts ? products : products.filter((product) => product.status === PRODUCT_STATUSES.published);
};

/**
 * Creates a product in the browser, or updates it when an id is given.
 *
 * @param input Product data.
 * @param id Id of the product to update.
 * @returns The saved product.
 */
const saveInBrowser = (input: ProductInput, id?: number) => (id ? browserRepository.update(id, input) : browserRepository.create(input));

export const listProducts = IS_API_ENABLED ? remote.listProducts : listFromBrowser;

/**
 * Finds one product.
 *
 * @param id Product id.
 * @returns The product, or null when it does not exist.
 */
export const getProduct = IS_API_ENABLED ? remote.getProduct : (id: number) => browserRepository.getById(id);

export const saveProduct = IS_API_ENABLED ? remote.saveProduct : saveInBrowser;

/**
 * Deletes a product.
 *
 * @param id Product id.
 */
export const deleteProduct = IS_API_ENABLED ? remote.deleteProduct : (id: number) => browserRepository.remove(id);
