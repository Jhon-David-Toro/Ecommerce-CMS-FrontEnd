"use client";

import type { FC } from "react";

import { Button } from "@/components/ui/Button";

import type { FeaturedProductsProps } from "./FeaturedProducts.types";
import { isSectionHidden } from "./FeaturedProducts.utils";
import { useVisibleProducts } from "./hooks/useVisibleProducts";
import { FeaturedProductsList } from "./parts/FeaturedProductsList";
import styles from "./FeaturedProducts.module.scss";

/**
 * FeaturedProducts: titled grid of products that starts with four and expands on demand.
 * Without products it shows a message, or hides itself when no message is given.
 *
 * @param props Component props.
 * @param props.products Products to show.
 * @param props.category Title of the section.
 * @param props.isLoading Whether the products are still loading.
 * @param props.emptyMessage Sentence shown when there are no products; without it the section hides.
 * @returns The product section.
 */
export const FeaturedProducts: FC<FeaturedProductsProps> = ({ products, category, isLoading, emptyMessage }) => {
  const { visibleProducts, canShowMore, showAll } = useVisibleProducts(products);

  if (isSectionHidden({ products, isLoading, emptyMessage })) return null;

  return (
    <section className={styles.products}>
      <hr className={styles.products__hr} />
      <h2 className={styles.products__title}>{category}</h2>
      <FeaturedProductsList products={visibleProducts} isLoading={isLoading} emptyMessage={emptyMessage} />
      {canShowMore && <Button type="secondary" text="View All" size="medium" typeAttribute="button" onClick={showAll} />}
    </section>
  );
};
