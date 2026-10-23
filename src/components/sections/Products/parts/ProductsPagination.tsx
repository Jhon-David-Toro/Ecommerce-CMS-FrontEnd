import { Pagination } from "@/components/patterns/Pagination";
import { Divider } from "@/components/ui/Divider";

import type { ProductsPaginationProps } from "../Products.types";

/**
 * Products/Pagination: divider and page buttons, hidden while there are no products to page through.
 *
 * @param props Component props.
 * @param props.total Number of products that match.
 * @param props.currentPage Page being shown.
 * @param props.totalPages Number of pages.
 * @param props.onPageChange Called with the page the user picks.
 * @returns The pagination, or nothing without products.
 */
export const ProductsPagination = ({ total, currentPage, totalPages, onPageChange }: ProductsPaginationProps) =>
  total > 0 && (
    <>
      <Divider />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
