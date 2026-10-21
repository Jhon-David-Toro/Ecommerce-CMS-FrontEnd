import { ProductCard } from "@/components/patterns/ProductCard";

import type { ResultsGridProps } from "../SearchResults.types";
import styles from "../SearchResults.module.scss";

/**
 * SearchResults/Grid: how many products matched and a card for each one.
 *
 * @param props Component props.
 * @param props.results Matching products.
 * @returns The count and the grid.
 */
export const ResultsGrid = ({ results }: ResultsGridProps) => (
  <>
    <p className={styles.search__count}>{results.length} products</p>
    <div className={styles.search__grid}>
      {results.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  </>
);
