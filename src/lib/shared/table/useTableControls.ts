import { useMemo, useState } from "react";

import type { TableControlsOptions } from "./table.types";

/**
 * Searches and paginates a list of rows in memory.
 *
 * @param rows All the rows.
 * @param options Table options.
 * @param options.pageSize Rows on each page.
 * @param options.initialQuery Search text the list starts with.
 * @param options.matches Tells whether a row matches the search text.
 * @returns The search text and its setter, the rows of the current page, the page state and the number of matches.
 */
export const useTableControls = <T>(rows: T[], { pageSize, matches, initialQuery = "" }: TableControlsOptions<T>) => {
  const [query, setQueryState] = useState(initialQuery);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return text ? rows.filter((row) => matches(row, text)) : rows;
  }, [rows, query, matches]);

  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const currentPage = Math.min(page, totalPages);

  /**
   * Changes the search text and goes back to the first page.
   *
   * @param value New search text.
   */
  const setQuery = (value: string) => {
    setQueryState(value);
    setPage(1);
  };

  return {
    query,
    setQuery,
    page: currentPage,
    setPage,
    totalPages,
    total: filtered.length,
    pageRows: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  };
};
