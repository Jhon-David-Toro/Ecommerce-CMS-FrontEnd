'use client';

import { FC, useState } from 'react';
import { ReviewsProps } from './Reviews.types';
import ReviewCard from '@/components/patterns/ReviewCard/ReviewCard';
import styles from './Reviews.module.scss';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';

const SORT_OPTIONS = ['Latest', 'Oldest'] as const;

const Reviews: FC<ReviewsProps> = ({ review }) => {
  const [sortOrder, setSortOrder] = useState<string>('Latest');
  const [visibleReviews, setVisibleReviews] = useState(6);

  const sortedReviews = [...review].sort((a, b) => {
    if (sortOrder === 'Latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 6);
  };

  return (
    <section className={styles.reviews}>
      <header className={styles.reviews__header}>
        <h2 className={styles.reviews__header_tally}>
          All Reviews{' '}
          <span className={styles.reviews__header_length}>
            ({review.length})
          </span>
        </h2>

        <div className={styles.reviews__controls}>
          <Select
            value={sortOrder}
            options={SORT_OPTIONS}
            onChange={setSortOrder}
          />

          <button className={styles.reviews__writeReview}>
            Write a Review
          </button>
        </div>
      </header>

      <article className={styles.reviews__list}>
        {sortedReviews.slice(0, visibleReviews).map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </article>

      {visibleReviews < review.length && (
        <Button
          type="secondary"
          text="Load More Reviews"
          size="medium"
          onClick={loadMoreReviews}
          typeAttribute="button"
        />
      )}
    </section>
  );
};

export default Reviews;
