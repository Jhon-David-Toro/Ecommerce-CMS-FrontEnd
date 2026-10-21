'use client';

import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import { SORT_OPTIONS } from './TitleAllProducts.constants';
import { TitleAllProductsProps } from './TitleAllProducts.types';
import { getShowingText } from './TitleAllProducts.utils';
import styles from './TitleAllProducts.module.scss';
import { Select } from "@/components/ui/Select";

export const TitleAllProducts = ({currentPage, productsPerPage, totalProducts}: TitleAllProductsProps) => {
  const { selectedCategoryName, sortBy, setSortBy } = useFilterStore();

  const title = selectedCategoryName?.trim() ? selectedCategoryName : 'All Products';

  const showingText = getShowingText({ currentPage, productsPerPage, totalProducts });

  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>{title}</h2>

      <div className={styles.container__info}>
        <p className={styles.container__showing}>{showingText}</p>

        <Select
          value={sortBy}
          options={SORT_OPTIONS}
          onChange={setSortBy}
        />

      </div>
    </section>
  );
};
