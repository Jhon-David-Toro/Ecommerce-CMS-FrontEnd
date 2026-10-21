"use client";

import { Select } from "@/components/ui/Select";
import { SORT_OPTIONS } from "@/lib/catalog/filters/filters.constants";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import type { TitleAllProductsProps } from "./TitleAllProducts.types";
import { getShowingText, getTitle } from "./TitleAllProducts.utils";
import styles from "./TitleAllProducts.module.scss";

/**
 * TitleAllProducts: product list title, "showing" counter and sort select.
 *
 * @param props Component props.
 * @param props.currentPage Current page, starting at 1.
 * @param props.productsPerPage Products on each page.
 * @param props.totalProducts Total products after filtering.
 * @returns The list header.
 */
export const TitleAllProducts = (props: TitleAllProductsProps) => {
  const { selectedCategoryName, sortBy, setSortBy } = useFilterStore();

  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>{getTitle(props.heading || selectedCategoryName)}</h2>
      <div className={styles.container__info}>
        <p className={styles.container__showing}>{getShowingText(props)}</p>
        <Select value={sortBy} options={SORT_OPTIONS} onChange={setSortBy} />
      </div>
    </section>
  );
};
