import { FC } from 'react';
import { CheckCircleIcon } from '@heroicons/react/16/solid';
import { ReviewCardProps } from './ReviewCard.types';
import { Rating } from "@/components/ui/Rating";
import styles from './ReviewCard.module.scss';

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className={styles.review}>
      <Rating rating={review.rating} size='extra-medium' numbers={false} />
      <p className={styles.review__author}>
        {review.author} {review.verified && <CheckCircleIcon className={styles.review__author__check} />}
      </p>
      <p className={styles.review__text}>{`"${review.text}"`}</p>
      <p className={styles.review__date}>Posted on {review.date}</p>
    </article>
  );
};
