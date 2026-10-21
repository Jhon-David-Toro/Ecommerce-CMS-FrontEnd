"use client";

import { EmptyGate } from "@/components/patterns/EmptyGate";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Spinner } from "@/components/ui/Spinner";

import { EMPTY_RESULTS, SEARCH_TRAIL } from "./SearchResults.constants";
import { getSearchTitle } from "./SearchResults.utils";
import { useSearchResults } from "./hooks/useSearchResults";
import { ResultsGrid } from "./parts/ResultsGrid";
import styles from "./SearchResults.module.scss";

/**
 * SearchResults: products whose name, category, brand or description match the `q` text of the address.
 *
 * @returns The search results page content.
 */
export const SearchResults = () => {
  const { query, results, isLoading } = useSearchResults();

  if (isLoading) return <Spinner label="Searching" />;

  return (
    <section className={styles.search}>
      <Breadcrumb items={SEARCH_TRAIL} />
      <h1 className={styles.search__title}>{getSearchTitle(query)}</h1>
      <EmptyGate count={results.length} empty={EMPTY_RESULTS}>
        <ResultsGrid results={results} />
      </EmptyGate>
    </section>
  );
};
