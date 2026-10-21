import { StarIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import { MAX_RATING } from "./Rating.constants";
import type { RatingProps } from "./Rating.types";
import { buildStars } from "./Rating.utils";
import styles from "./Rating.module.scss";

/**
 * Rating: five stars (full, half or empty) with an optional numeric value.
 *
 * @param props Component props.
 * @param props.rating Rating value between 0 and 5.
 * @param props.size Size preset.
 * @param props.numbers Shows the numeric value beside the stars.
 * @returns The rating.
 */
export const Rating: FC<RatingProps> = ({ rating, size, numbers = true }) => (
  <section className={cx(styles.rating, styles[size])}>
    {buildStars(rating).map((kind, index) => (
      <StarIcon key={`${kind}-${index}`} className={cx(styles.star, styles[kind], styles[size])} />
    ))}
    {numbers && (
      <p className={styles.rating__number}>
        {rating}/<span className={styles.rating__number_last}>{MAX_RATING}</span>
      </p>
    )}
  </section>
);
