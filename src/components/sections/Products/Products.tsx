'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import { ProductCard } from "@/components/patterns/ProductCard";
import { useClickOutside } from '@/lib/shared/dom/useClickOutside';
import { useEscKey } from '@/lib/shared/dom/useEscKey';
import { Filters } from "@/components/patterns/Filters";
import { Divider } from "@/components/ui/Divider";
import { Pagination } from "@/components/patterns/Pagination";
import { TitleAllProducts } from "@/components/patterns/TitleAllProducts";
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { usePagination } from './hooks/usePagination';
import styles from './Products.module.scss';

const PRODUCTS_PER_PAGE = 9;

export const Products = () => {
  const { isFiltersOpen, setIsFiltersOpen } = useFilterStore();
  const products = useFilteredProducts();
  const { currentPage, totalPages, pageItems, setCurrentPage } = usePagination(products, PRODUCTS_PER_PAGE);
  const filtersRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);

  useClickOutside(filtersRef, () => isFiltersOpen && setIsFiltersOpen(false));
  useEscKey(productsRef, () => setIsFiltersOpen(false), isFiltersOpen);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={styles.products} ref={productsRef}>
      <section ref={filtersRef} className={clsx(styles.products__filters, { [styles.filtersOpen]: isFiltersOpen })}>
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
