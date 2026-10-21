"use client";

import { useRef } from "react";

import { Filters } from "@/components/patterns/Filters";
import { Pagination } from "@/components/patterns/Pagination";
import { ProductCard } from "@/components/patterns/ProductCard";
import { TitleAllProducts } from "@/components/patterns/TitleAllProducts";
import { Divider } from "@/components/ui/Divider";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { cx } from "@/lib/shared/classnames/cx";
import { useClickOutside } from "@/lib/shared/dom/useClickOutside";
import { useEscKey } from "@/lib/shared/dom/useEscKey";

import { useFilteredProducts } from "./hooks/useFilteredProducts";
import { usePagination } from "./hooks/usePagination";
import { PRODUCTS_PER_PAGE } from "./Products.constants";
import styles from "./Products.module.scss";

/**
 * Products: filter panel, sortable product grid and pagination.
 *
 * @returns The products page content.
 */
export const Products = () => {
  const { isFiltersOpen, setIsFiltersOpen } = useFilterStore();
  const products = useFilteredProducts();
  const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(products, PRODUCTS_PER_PAGE);
  const filtersRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);

  useClickOutside(filtersRef, () => isFiltersOpen && setIsFiltersOpen(false));
  useEscKey(productsRef, () => setIsFiltersOpen(false), isFiltersOpen);

  /**
   * Shows another page and scrolls back to the top.
   *
   * @param page Page to show.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.products} ref={productsRef}>
      <section ref={filtersRef} className={cx(styles.products__filters, { [styles.filtersOpen]: isFiltersOpen })}>
        <Filters />
      </section>
      <section className={styles.products__cards}>
        <TitleAllProducts currentPage={currentPage} productsPerPage={PRODUCTS_PER_PAGE} totalProducts={products.length} />
        <article className={styles.products__cards__product}>
          {pageItems.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </article>
        <Divider />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </section>
    </main>
  );
};
