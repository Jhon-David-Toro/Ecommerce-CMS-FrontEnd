import { isAdminSession } from "@/lib/auth/auth.session";
import type { Repository } from "@/lib/mock/repository.types";
import { UNSUPPORTED_MESSAGE } from "@/lib/shared/http/api.constants";
import { apiRequest } from "@/lib/shared/http/apiClient";
import { nullWhenMissing } from "@/lib/shared/http/remoteRepository";
import { listBrands, listCategories } from "@/lib/taxonomy/taxonomy.api";

import { fromAdminProduct, fromAdminSummary, toProductRequest } from "./catalog.mappers";
import { ADMIN_PAGE_SIZE, API_PATHS, STATUS_ACTIONS } from "./catalog.remote.constants";
import type { ApiPage, ApiProduct, ApiProductSummary, TaxonomyIds } from "./catalog.remote.types";
import type { Product, ProductInput, ProductListOptions, ProductStatus } from "./product.types";

/**
 * Finds the id of a category or brand by its name, ignoring case.
 *
 * @param items Known records.
 * @param name Name written in the product form.
 * @returns The id, or null when there is no such record.
 */
export const findIdByName = (items: { id: number; name: string }[], name: string) =>
  items.find((item) => item.name.toLowerCase() === name.trim().toLowerCase())?.id ?? null;

/**
 * Looks up the ids of the category and the brand named in a product.
 *
 * @param input Product data of the form.
 * @returns The ids, null for the ones that do not exist.
 */
export const resolveTaxonomy = async ({ category, brand }: Pick<ProductInput, "category" | "brand">): Promise<TaxonomyIds> => {
  const [categories, brands] = await Promise.all([listCategories(), listBrands()]);
  return { categoryId: findIdByName(categories, category), brandId: findIdByName(brands, brand) };
};

/**
 * Reads every page of the admin product list.
 *
 * @returns Every product, drafts included, as rows of the list.
 */
export const listAdminProducts = async () => {
  const rows: ApiProductSummary[] = [];
  let page = 0;
  let isLast = false;

  while (!isLast) {
    const result = await apiRequest<ApiPage<ApiProductSummary>>(`${API_PATHS.products}?page=${page}&size=${ADMIN_PAGE_SIZE}`);
    rows.push(...result.content);
    isLast = result.last;
    page += 1;
  }

  return rows.map(fromAdminSummary);
};

/**
 * Lists products; drafts are only included for administrators who ask for them.
 *
 * @param options List options.
 * @param options.includeDrafts Includes products that are not published.
 * @returns The products.
 */
export const listProducts = ({ includeDrafts = false }: ProductListOptions = {}) =>
  includeDrafts && isAdminSession() ? listAdminProducts() : apiRequest<Product[]>(API_PATHS.catalog);

/**
 * Finds one product: administrators see drafts too, everybody else only published products.
 *
 * @param id Product id.
 * @returns The product, or null when it does not exist.
 */
export const getProduct = (id: number) =>
  (isAdminSession()
    ? apiRequest<ApiProduct>(`${API_PATHS.products}/${id}`).then(fromAdminProduct)
    : apiRequest<Product>(`${API_PATHS.catalog}/${id}`)
  ).catch(nullWhenMissing);

/**
 * Moves a saved product to the status the form asked for.
 *
 * @param saved Product as the API saved it.
 * @param wanted Status chosen in the form.
 * @returns The product after the change.
 */
export const syncStatus = async (saved: ApiProduct, wanted: ProductStatus): Promise<ApiProduct> => {
  const action = STATUS_ACTIONS[`${saved.status}->${wanted}`];
  return action ? apiRequest<ApiProduct>(`${API_PATHS.products}/${saved.id}/${action}`, { method: "POST" }) : saved;
};

/**
 * Creates a product, or updates it when an id is given.
 *
 * @param input Product data.
 * @param id Id of the product to update.
 * @returns The saved product.
 */
export const saveProduct = async (input: ProductInput, id?: number) => {
  const body = toProductRequest(input, await resolveTaxonomy(input));
  const saved = id
    ? await apiRequest<ApiProduct>(`${API_PATHS.products}/${id}`, { method: "PUT", body })
    : await apiRequest<ApiProduct>(API_PATHS.products, { method: "POST", body });

  return fromAdminProduct(await syncStatus(saved, input.status));
};

/**
 * Deletes a product; a published one is archived first because the API does not delete published products.
 *
 * @param id Product id.
 */
export const deleteProduct = async (id: number) => {
  const current = await apiRequest<ApiProduct>(`${API_PATHS.products}/${id}`);
  if (current.status === "PUBLISHED") await apiRequest(`${API_PATHS.products}/${id}/archive`, { method: "POST" });
  await apiRequest<void>(`${API_PATHS.products}/${id}`, { method: "DELETE" });
};

/**
 * Applies a change to a product; only administrators can change products through the API, so for the rest it does nothing
 * (stock and rating changes caused by orders and reviews are not sent yet).
 *
 * @param id Product id.
 * @param patch Fields to change.
 * @returns The product after the change.
 */
export const updateProduct = async (id: number, patch: Partial<ProductInput>) => {
  const current = await getProduct(id);
  if (!current) throw new Error(UNSUPPORTED_MESSAGE);
  if (!isAdminSession()) return current;
  const { id: ignored, ...rest } = current;
  void ignored;
  return saveProduct({ ...rest, ...patch }, id);
};

export const productRepository: Repository<Product> = {
  list: () => listProducts({ includeDrafts: true }),
  getById: getProduct,
  create: (data) => saveProduct(data),
  update: updateProduct,
  remove: deleteProduct,
  save: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
};
