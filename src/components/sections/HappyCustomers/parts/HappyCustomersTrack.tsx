import type { CSSProperties } from "react";

import { HappyCard } from "@/components/patterns/HappyCard";

import type { HappyCustomersTrackProps } from "../HappyCustomers.types";
import styles from "../HappyCustomers.module.scss";

/**
 * HappyCustomers/Track: row of review cards shifted by the slider position.
 *
 * @param props Component props.
 * @param props.reviews Reviews to show.
 * @param props.offsetPercent Horizontal shift of the track, as a percentage of its width.
 * @returns The track.
 */
export const HappyCustomersTrack = ({ reviews, offsetPercent }: HappyCustomersTrackProps) => (
  <div className={styles.happy__container}>
    <ul className={styles.happy__container_track} style={{ "--slide-offset": `${offsetPercent}%` } as CSSProperties}>
      {reviews.map((review) => (
        <li className={styles.happy__container_slide} key={review.id}>
          <HappyCard name={review.author} rating={review.rating} text={review.text} />
        </li>
      ))}
    </ul>
  </div>
);
