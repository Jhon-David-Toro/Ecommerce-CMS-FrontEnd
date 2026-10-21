"use client";

import { Pagination } from "@/components/patterns/Pagination";
import { TitleAllProducts } from "@/components/patterns/TitleAllProducts";
import { Divider } from "@/components/ui/Divider";

import { PRODUCTS_PER_PAGE } from "./Products.constants";
import { useProductsPage } from "./hooks/useProductsPage";
import { FiltersToggle } from "./parts/FiltersToggle";
import { ProductsFilters } from "./parts/ProductsFilters";
import { ProductsGrid } from "./parts/ProductsGrid";
import styles from "./Products.module.scss";

/**
 * Products: filter panel, sortable product grid and pagination.
 *
 * @returns The products page content.
 */
export const Products = () => {
  const { title, isFiltersOpen, openFilters, closeFilters, filtersRef, pageRef, total, currentPage, totalPages, pageItems, changePage } =
    useProductsPage();

  return (
    <main className={styles.products} ref={pageRef}>
      <ProductsFilters ref={filtersRef} isOpen={isFiltersOpen} onClose={closeFilters} />
      <section className={styles.products__cards}>
        <FiltersToggle onOpen={openFilters} />
        <TitleAllProducts heading={title} currentPage={currentPage} productsPerPage={PRODUCTS_PER_PAGE} totalProducts={total} />
        <ProductsGrid products={pageItems} />
        <Divider />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
      </section>
    </main>
  );
};
