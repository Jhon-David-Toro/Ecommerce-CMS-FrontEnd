import { useMemo, useState } from "react";

/**
 * Slices a list into pages and remembers the current one; a new list sends the user back to the first page.
 *
 * @param items Full list.
 * @param perPage Items on each page.
 * @returns The current page, the page count, the items of the current page and the page setter.
 */
export const usePagination = <T>(items: T[], perPage: number) => {
  const [selection, setSelection] = useState({ page: 1, items });
  const currentPage = selection.items === items ? selection.page : 1;
  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const pageItems = useMemo(() => items.slice(startIndex, startIndex + perPage), [items, startIndex, perPage]);

  /**
   * Shows another page of the current list.
   *
   * @param page Page to show, starting at 1.
   */
  const setCurrentPage = (page: number) => setSelection({ page, items });

  return { currentPage, totalPages, pageItems, setCurrentPage };
};
