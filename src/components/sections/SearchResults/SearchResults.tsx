"use client";

import { useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/patterns/ProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { listProducts } from "@/lib/catalog/catalog.api";
import { searchProducts } from "@/lib/catalog/catalog.utils";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_OPTIONS } from "./SearchResults.constants";
import styles from "./SearchResults.module.scss";

/**
 * SearchResults: products whose name, category, brand or description match the `q` text of the address.
 *
 * @returns The search results page content.
 */
export const SearchResults = () => {
  const query = useSearchParams().get("q") ?? "";
  const { data, isLoading } = useQuery(listProducts, NO_OPTIONS);

  if (isLoading) return <Spinner label="Searching" />;

  const results = searchProducts(data ?? [], query);

  return (
    <section className={styles.search}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className={styles.search__title}>{query ? `RESULTS FOR "${query.toUpperCase()}"` : "SEARCH"}</h1>
      {results.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try a different word or browse the whole catalog."
          action={<Button type="primary" size="medium" text="Browse products" href="/products" typeAttribute="button" />}
        />
      ) : (
        <>
          <p className={styles.search__count}>{results.length} products</p>
          <div className={styles.search__grid}>
            {results.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
