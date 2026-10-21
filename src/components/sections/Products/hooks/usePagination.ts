import { useMemo, useState } from 'react';

export const usePagination = <T,>(items: T[], perPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const pageItems = useMemo(() => items.slice(startIndex, startIndex + perPage), [items, startIndex, perPage]);

  return { currentPage, totalPages, pageItems, setCurrentPage };
};
