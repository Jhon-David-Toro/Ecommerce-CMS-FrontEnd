import { ProductCard } from "@/components/patterns/ProductCard";
import { Spinner } from "@/components/ui/Spinner";

import type { ProductsGridProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/Grid: cards of the products on the current page.
 *
 * @param props Component props.
 * @param props.products Products to draw.
 * @param props.isLoading Shows a spinner instead of the cards while the products load.
 * @returns The product grid.
 */
export const ProductsGrid = ({ products, isLoading }: ProductsGridProps) =>
  isLoading ? (
    <Spinner label="Loading products" />
  ) : (
    <article className={styles.products__cards__product}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </article>
  );
