"use client";

import { useState } from "react";
import type { FC } from "react";

import { ReviewCard } from "@/components/patterns/ReviewCard";
import { Button } from "@/components/ui/Button";

import { REVIEWS_PAGE_SIZE, SORT_ORDERS } from "./Reviews.constants";
import type { ReviewsProps } from "./Reviews.types";
import { sortReviews } from "./Reviews.utils";
import { ReviewsHeader } from "./parts/ReviewsHeader";
import styles from "./Reviews.module.scss";

/**
 * Reviews: sortable list of customer reviews that loads six more at a time.
 *
 * @param props Component props.
 * @param props.review Reviews of the product.
 * @returns The reviews section.
 */
export const Reviews: FC<ReviewsProps> = ({ review }) => {
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDERS.latest);
  const [visibleReviews, setVisibleReviews] = useState(REVIEWS_PAGE_SIZE);

  return (
    <section className={styles.reviews}>
      <ReviewsHeader total={review.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
      <article className={styles.reviews__list}>
        {sortReviews(review, sortOrder)
          .slice(0, visibleReviews)
          .map((item) => (
            <ReviewCard key={item.id} review={item} />
          ))}
      </article>
      {visibleReviews < review.length && (
        <Button
          type="secondary"
          text="Load More Reviews"
          size="medium"
          onClick={() => setVisibleReviews((count) => count + REVIEWS_PAGE_SIZE)}
          typeAttribute="button"
        />
      )}
    </section>
  );
};
