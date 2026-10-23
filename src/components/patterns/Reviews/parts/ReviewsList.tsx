import { ReviewCard } from "@/components/patterns/ReviewCard";

import { REVIEWS_EMPTY } from "../Reviews.constants";
import type { ReviewsListProps } from "../Reviews.types";
import styles from "../Reviews.module.scss";

/**
 * Reviews/List: the review cards, or a message while there are none.
 *
 * @param props Component props.
 * @param props.reviews Reviews to show.
 * @returns The list or the message.
 */
export const ReviewsList = ({ reviews }: ReviewsListProps) =>
  reviews.length ? (
    <article className={styles.reviews__list}>
      {reviews.map((item) => (
        <ReviewCard key={item.id} review={item} />
      ))}
    </article>
  ) : (
    <p className={styles.reviews__empty}>{REVIEWS_EMPTY}</p>
  );
