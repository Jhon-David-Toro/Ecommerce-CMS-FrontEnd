import { Select } from "@/components/ui/Select";

import { SORT_OPTIONS } from "../Reviews.constants";
import type { ReviewsHeaderProps } from "../Reviews.types";
import styles from "../Reviews.module.scss";

/**
 * Reviews/Header: review count, sort select and the write review button.
 *
 * @param props Component props.
 * @param props.total Number of reviews.
 * @param props.sortOrder Selected sort order.
 * @param props.onSortChange Called with the sort order the user picks.
 * @returns The header.
 */
export const ReviewsHeader = ({ total, sortOrder, onSortChange }: ReviewsHeaderProps) => (
  <header className={styles.reviews__header}>
    <h2 className={styles.reviews__header_tally}>
      All Reviews <span className={styles.reviews__header_length}>({total})</span>
    </h2>
    <div className={styles.reviews__controls}>
      <Select value={sortOrder} options={SORT_OPTIONS} onChange={onSortChange} />
      <button className={styles.reviews__writeReview}>Write a Review</button>
    </div>
  </header>
);
