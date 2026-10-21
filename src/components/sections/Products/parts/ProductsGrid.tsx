import { ProductCard } from "@/components/patterns/ProductCard";

import type { ProductsGridProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/Grid: cards of the products on the current page.
 *
 * @param props Component props.
 * @param props.products Products to draw.
 * @returns The product grid.
 */
export const ProductsGrid = ({ products }: ProductsGridProps) => (
  <article className={styles.products__cards__product}>
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </article>
);
