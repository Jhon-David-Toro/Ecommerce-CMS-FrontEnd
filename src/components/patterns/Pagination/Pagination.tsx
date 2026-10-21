"use client";

import type { FC } from "react";

import { Button } from "@/components/ui/Button";
import { useWindowWidth } from "@/lib/shared/dom/useWindowWidth";

import { MOBILE_MAX_WIDTH } from "./Pagination.constants";
import type { PaginationProps } from "./Pagination.types";
import { generatePageElements, goToNextPage, goToPreviousPage } from "./Pagination.utils";
import { PaginationItem } from "./parts/PaginationItem";
import styles from "./Pagination.module.scss";

/**
 * Pagination: previous and next buttons around a window of page numbers.
 *
 * @param props Component props.
 * @param props.currentPage Current page, starting at 1.
 * @param props.totalPages Number of pages.
 * @param props.onPageChange Called with the page the user picks.
 * @returns The pagination bar.
 */
export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useWindowWidth() <= MOBILE_MAX_WIDTH;
  const elements = generatePageElements({ currentPage, totalPages, onPageChange, isMobile });

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button
        type="secondary"
        text="Previous"
        onClick={() => goToPreviousPage(currentPage, onPageChange)}
        className={styles.navButton}
        size="small-pagination"
        margin="zero"
        icon="chevron-left"
        iconPosition="left"
        disabled={currentPage === 1}
        typeAttribute="button"
      />
      <ul className={styles.pageNumbers}>
        {elements.map((element) => (
          <PaginationItem key={element.key} element={element} />
        ))}
      </ul>
      <Button
        type="secondary"
        text="Next"
        onClick={() => goToNextPage(currentPage, totalPages, onPageChange)}
        className={styles.navButton}
        size="small-pagination"
        margin="zero"
        icon="chevron-right"
        iconPosition="right"
        disabled={currentPage === totalPages}
        typeAttribute="button"
      />
    </nav>
  );
};
