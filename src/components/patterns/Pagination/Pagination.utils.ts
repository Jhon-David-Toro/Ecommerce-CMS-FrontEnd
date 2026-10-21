import { range } from "@/lib/shared/collections/collections";

import { ELLIPSIS, ELLIPSIS_KEYS, MAX_PAGES_TO_SHOW, MAX_PAGES_TO_SHOW_MOBILE } from "./Pagination.constants";
import type { PageElement, PageElementsParams, PageRange } from "./Pagination.types";

/**
 * Chooses how many page buttons fit.
 *
 * @param isMobile True on small screens.
 * @returns The maximum number of page buttons.
 */
export const getMaxPages = (isMobile: boolean) => (isMobile ? MAX_PAGES_TO_SHOW_MOBILE : MAX_PAGES_TO_SHOW);

/**
 * Asks for the previous page, unless already on the first.
 *
 * @param currentPage Current page.
 * @param onPageChange Receives the new page.
 */
export const goToPreviousPage = (currentPage: number, onPageChange: (page: number) => void) => {
  if (currentPage > 1) onPageChange(currentPage - 1);
};

/**
 * Asks for the next page, unless already on the last.
 *
 * @param currentPage Current page.
 * @param totalPages Number of pages.
 * @param onPageChange Receives the new page.
 */
export const goToNextPage = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
  if (currentPage < totalPages) onPageChange(currentPage + 1);
};

/**
 * Computes the window of page buttons centered on the current page.
 *
 * @param currentPage Current page.
 * @param totalPages Number of pages.
 * @param isMobile True on small screens.
 * @returns The first and last page of the window.
 */
export const getPageRange = (currentPage: number, totalPages: number, isMobile = false): PageRange => {
  const maxPages = getMaxPages(isMobile);
  const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));

  return { startPage, endPage: Math.min(totalPages, startPage + maxPages - 1) };
};

/**
 * Lists the buttons and ellipses of the pagination bar.
 *
 * @param params Pagination state.
 * @param params.currentPage Current page.
 * @param params.totalPages Number of pages.
 * @param params.onPageChange Receives the page a button points to.
 * @param params.isMobile True on small screens.
 * @returns The elements to draw, always starting at page 1 and ending at the last page.
 */
export const generatePageElements = ({ currentPage, totalPages, onPageChange, isMobile = false }: PageElementsParams) => {
  /**
   * Builds the button of one page.
   *
   * @param page Page the button points to.
   * @returns The page element.
   */
  const pageElement = (page: number): PageElement => ({
    key: page,
    content: page,
    isActive: currentPage === page,
    onClick: () => onPageChange(page),
  });

  if (totalPages <= getMaxPages(isMobile)) return range(1, totalPages).map(pageElement);

  const { startPage, endPage } = getPageRange(currentPage, totalPages, isMobile);
  const startEllipsis: PageElement[] = startPage > 2 ? [{ key: ELLIPSIS_KEYS.start, content: ELLIPSIS, isEllipsis: true }] : [];
  const endEllipsis: PageElement[] = endPage < totalPages - 1 ? [{ key: ELLIPSIS_KEYS.end, content: ELLIPSIS, isEllipsis: true }] : [];
  const middle = range(startPage, endPage).filter((page) => page !== 1 && page !== totalPages);

  return [pageElement(1), ...startEllipsis, ...middle.map(pageElement), ...endEllipsis, pageElement(totalPages)];
};
