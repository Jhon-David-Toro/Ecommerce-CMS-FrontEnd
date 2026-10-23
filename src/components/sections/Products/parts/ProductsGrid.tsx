import { ActionEmptyState } from "@/components/patterns/ActionEmptyState";
import { ProductCard } from "@/components/patterns/ProductCard";
import { Spinner } from "@/components/ui/Spinner";

import { PRODUCTS_EMPTY } from "../Products.constants";
import type { ProductsGridProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/Cards: cards of the products on the current page.
 *
 * @param props Component props.
 * @param props.products Products to draw.
 * @returns The cards.
 */
const ProductsCards = ({ products }: Pick<ProductsGridProps, "products">) => (
  <article className={styles.products__cards__product}>
    {products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </article>
);

/**
 * Products/Grid: cards of the products on the current page, a spinner while they load, or a way back to the whole catalog when none match.
 *
 * @param props Component props.
 * @param props.products Products to draw.
 * @param props.isLoading Shows a spinner instead of the cards while the products load.
 * @returns The product grid.
 */
export const ProductsGrid = ({ products, isLoading }: ProductsGridProps) => {
  if (isLoading) return <Spinner label="Loading products" />;
  return products.length ? <ProductsCards products={products} /> : <ActionEmptyState {...PRODUCTS_EMPTY} />;
};
