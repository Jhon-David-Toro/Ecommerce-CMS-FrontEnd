import { getNewArrivals, searchProducts } from "@/lib/catalog/catalog.utils";
import { DEFAULT_SORT } from "@/lib/catalog/filters/filters.constants";
import type { FilterCreator, FilterCriteria } from "@/lib/catalog/filters/filters.types";
import type { Product } from "@/lib/catalog/product.types";

import { NEW_ARRIVALS_LIMIT, SORT_COMPARATORS, VIEWS, VIEW_TITLES } from "./Products.constants";
import type { CatalogScope } from "./Products.types";

/**
 * Tells whether a value passes a multi-select filter: an empty selection lets everything through.
 *
 * @param selected Values the user picked.
 * @param value Value of the product, when it has one.
 * @returns True when the product matches.
 */
export const matchesSelection = (selected: string[], value?: string) =>
  selected.length === 0 || (value !== undefined && selected.includes(value));

/**
 * Tells whether any value of the product is selected: an empty selection lets everything through.
 *
 * @param selected Values the user picked.
 * @param values Values of the product.
 * @returns True when the product matches.
 */
export const matchesAny = (selected: string[], values: string[]) =>
  selected.length === 0 || values.some((value) => selected.includes(value));

export const filterCreators: Record<keyof Omit<FilterCriteria, "sortBy">, FilterCreator> = {
  category:
    ({ category }) =>
    (product) =>
      matchesSelection(category, product.category),
  priceRange:
    ({ priceRange }) =>
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  colors:
    ({ colors }) =>
    (product) =>
      matchesAny(
        colors,
        product.colors.map((color) => color.hex),
      ),
  sizes:
    ({ sizes }) =>
    (product) =>
      matchesAny(sizes, product.sizes),
  dressStyles:
    ({ dressStyles }) =>
    (product) =>
      matchesSelection(dressStyles, product.dressStyle),
};

/**
 * Keeps the products that satisfy every filter and sorts them.
 *
 * @param products Products to filter.
 * @param criteria Filters and sort order chosen by the user.
 * @returns A new, sorted list.
 */
export const filterProducts = (products: Product[], criteria: FilterCriteria) => {
  const filters = Object.values(filterCreators).map((create) => create(criteria));
  const comparator = SORT_COMPARATORS[criteria.sortBy ?? DEFAULT_SORT] ?? SORT_COMPARATORS[DEFAULT_SORT];

  return products.filter((product) => filters.every((matches) => matches(product))).sort(comparator);
};

/**
 * Narrows the catalog to what the address asks for: a search text, the sale, the new arrivals, one brand or one category.
 *
 * @param products Published products.
 * @param scope Search text, view, brand and category taken from the address.
 * @returns The products inside the scope.
 */
export const scopeProducts = (products: Product[], scope: CatalogScope) => {
  const searched = searchProducts(products, scope.query);
  const inView = scope.view === VIEWS.newest ? getNewArrivals(searched, NEW_ARRIVALS_LIMIT) : searched;
  const onSale = scope.view === VIEWS.sale ? inView.filter((product) => product.discountPrice !== null) : inView;
  const ofBrand = scope.brand ? onSale.filter((product) => product.brand === scope.brand) : onSale;
  return scope.category ? ofBrand.filter((product) => product.category === scope.category) : ofBrand;
};

/**
 * Picks the title of the products page for a scope.
 *
 * @param scope Search text, view and brand taken from the address.
 * @returns The title, or an empty string when the page shows the whole catalog.
 */
export const getScopeTitle = ({ query, view, brand, category }: CatalogScope) => {
  if (query) return `Results for "${query}"`;
  return brand || category || VIEW_TITLES[view] || "";
};
