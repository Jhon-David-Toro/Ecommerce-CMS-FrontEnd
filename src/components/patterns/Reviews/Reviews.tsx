"use client";

import type { FC } from "react";

import { Button } from "@/components/ui/Button";

import type { ReviewsProps } from "./Reviews.types";
import { useReviewsList } from "./hooks/useReviewsList";
import { ReviewsHeader } from "./parts/ReviewsHeader";
import { ReviewsList } from "./parts/ReviewsList";
import styles from "./Reviews.module.scss";

/**
 * Reviews: sortable list of customer reviews that loads six more at a time, with a message while there are none.
 *
 * @param props Component props.
 * @param props.review Reviews of the product.
 * @returns The reviews section.
 */
export const Reviews: FC<ReviewsProps> = ({ review }) => {
  const { sortOrder, setSortOrder, visibleReviews, canLoadMore, loadMore } = useReviewsList(review);

  return (
    <section className={styles.reviews}>
      <ReviewsHeader total={review.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
      <ReviewsList reviews={visibleReviews} />
      {canLoadMore && <Button type="secondary" text="Load More Reviews" size="medium" onClick={loadMore} typeAttribute="button" />}
    </section>
  );
};
