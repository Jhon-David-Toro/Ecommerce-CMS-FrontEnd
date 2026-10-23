import { useRef } from "react";

import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { useClickOutside } from "@/lib/shared/dom/useClickOutside";
import { useEscKey } from "@/lib/shared/dom/useEscKey";

import { PRODUCTS_PER_PAGE } from "../Products.constants";
import { getScopeTitle } from "../Products.utils";
import { useCatalogScope } from "./useCatalogScope";
import { useFilteredProducts } from "./useFilteredProducts";
import { usePagination } from "./usePagination";

/**
 * Gathers the state of the products page: filtered products, current page and the filter panel behavior.
 *
 * @returns Refs for the panel and the page, the functions that open and close the panel, the filtered products, the pagination state and the page changer.
 */
export const useProductsPage = () => {
  const { isFiltersOpen, setIsFiltersOpen } = useFilterStore();
  const scope = useCatalogScope();
  const { products, isLoading, filterOptions } = useFilteredProducts(scope);
  const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(products, PRODUCTS_PER_PAGE);
  const filtersRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLElement>(null);

  useClickOutside(filtersRef, () => isFiltersOpen && setIsFiltersOpen(false));
  useEscKey(pageRef, () => setIsFiltersOpen(false), isFiltersOpen);

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  /**
   * Shows another page and scrolls back to the top.
   *
   * @param page Page to show.
   */
  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    title: getScopeTitle(scope),
    isLoading,
    filterOptions,
    isFiltersOpen,
    openFilters,
    closeFilters,
    filtersRef,
    pageRef,
    total: products.length,
    currentPage,
    totalPages,
    pageItems,
    changePage,
  };
};
