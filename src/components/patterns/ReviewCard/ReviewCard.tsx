import { CheckCircleIcon } from "@heroicons/react/16/solid";
import type { FC } from "react";

import { Rating } from "@/components/ui/Rating";
import { formatDate } from "@/lib/shared/format/format";

import type { ReviewCardProps } from "./ReviewCard.types";
import styles from "./ReviewCard.module.scss";

/**
 * Card/Review: stars, author with a verified badge, review text and date.
 *
 * @param props Component props.
 * @param props.review Review to show.
 * @returns The review card.
 */
export const ReviewCard: FC<ReviewCardProps> = ({ review }) => (
  <article className={styles.review}>
    <Rating rating={review.rating} size="extra-medium" numbers={false} />
    <p className={styles.review__author}>
      {review.author} {review.verified && <CheckCircleIcon className={styles.review__author__check} />}
    </p>
    <p className={styles.review__text}>{`"${review.text}"`}</p>
    <p className={styles.review__date}>Posted on {formatDate(review.date)}</p>
  </article>
);
