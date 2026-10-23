import { ProductCard } from "@/components/patterns/ProductCard";
import { Spinner } from "@/components/ui/Spinner";

import type { FeaturedProductsListProps } from "../FeaturedProducts.types";
import styles from "../FeaturedProducts.module.scss";

/**
 * FeaturedProducts/List: the product cards, a spinner while they load, or a message when there are none.
 *
 * @param props Component props.
 * @param props.products Products to show.
 * @param props.isLoading Whether the products are still loading.
 * @param props.emptyMessage Sentence shown when there is nothing to list.
 * @returns The list, the spinner or the message.
 */
export const FeaturedProductsList = ({ products, isLoading, emptyMessage }: FeaturedProductsListProps) => {
  if (products.length) {
    return (
      <div className={styles.products__list}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    );
  }

  return isLoading ? <Spinner label="Loading products" /> : <p className={styles.products__empty}>{emptyMessage}</p>;
};
