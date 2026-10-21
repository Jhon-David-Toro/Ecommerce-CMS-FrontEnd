'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import { useFilterStore } from '@/app/store/filtersStore';
import ProductCard from '@/app/shared-components/product/ProductCard';
import useClickOutside from '@/app/hooks/useClickOutside';
import useEscKey from '@/app/hooks/useEscKey';
import Filters from './components/filters/Filters';
import Divider from '../product-details/components/divider/Divider';
import Pagination from './components/pagination/Pagination';
import TitleAllProducts from './components/filters/components/title-all-products/TitleAllProducts';
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { usePagination } from './hooks/usePagination';
import styles from './Products.module.scss';

const PRODUCTS_PER_PAGE = 9;

const Products = () => {
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

export default Products;
