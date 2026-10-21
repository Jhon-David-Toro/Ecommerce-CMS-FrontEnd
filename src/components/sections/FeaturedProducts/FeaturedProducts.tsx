"use client";

import { useState } from "react";
import type { FC } from "react";

import { ProductCard } from "@/components/patterns/ProductCard";
import { Button } from "@/components/ui/Button";

import { INITIAL_VISIBLE_PRODUCTS } from "./FeaturedProducts.constants";
import type { FeaturedProductsProps } from "./FeaturedProducts.types";
import styles from "./FeaturedProducts.module.scss";

/**
 * FeaturedProducts: titled grid of products that starts with four and expands on demand.
 *
 * @param props Component props.
 * @param props.products Products to show.
 * @param props.category Title of the section.
 * @returns The product section.
 */
export const FeaturedProducts: FC<FeaturedProductsProps> = ({ products, category }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, INITIAL_VISIBLE_PRODUCTS);
  const canShowMore = !showAll && products.length > INITIAL_VISIBLE_PRODUCTS;

  return (
    <section className={styles.products}>
      <hr className={styles.products__hr} />
      <h2 className={styles.products__title}>{category}</h2>
      <div className={styles.products__list}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      {canShowMore && <Button type="secondary" text="View All" size="medium" typeAttribute="button" onClick={() => setShowAll(true)} />}
    </section>
  );
};
