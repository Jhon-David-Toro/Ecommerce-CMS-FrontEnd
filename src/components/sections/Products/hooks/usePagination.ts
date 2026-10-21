import { useMemo, useState } from "react";

/**
 * Slices a list into pages and remembers the current one.
 *
 * @param items Full list.
 * @param perPage Items on each page.
 * @returns The current page, the page count, the items of the current page and the page setter.
 */
export const usePagination = <T>(items: T[], perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const pageItems = useMemo(() => items.slice(startIndex, startIndex + perPage), [items, startIndex, perPage]);

  return { currentPage, totalPages, pageItems, setCurrentPage };
};
