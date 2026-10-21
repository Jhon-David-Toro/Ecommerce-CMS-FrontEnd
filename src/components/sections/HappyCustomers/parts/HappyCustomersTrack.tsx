import type { CSSProperties } from "react";

import { HappyCard } from "@/components/patterns/HappyCard";

import { CUSTOMER_REVIEWS } from "../HappyCustomers.constants";
import type { HappyCustomersTrackProps } from "../HappyCustomers.types";
import styles from "../HappyCustomers.module.scss";

/**
 * HappyCustomers/Track: row of review cards shifted by the slider position.
 *
 * @param props Component props.
 * @param props.offsetPercent Horizontal shift of the track, as a percentage of its width.
 * @returns The track.
 */
export const HappyCustomersTrack = ({ offsetPercent }: HappyCustomersTrackProps) => (
  <div className={styles.happy__container}>
    <ul className={styles.happy__container_track} style={{ "--slide-offset": `${offsetPercent}%` } as CSSProperties}>
      {CUSTOMER_REVIEWS.map((review) => (
        <li className={styles.happy__container_slide} key={review.name}>
          <HappyCard {...review} />
        </li>
      ))}
    </ul>
  </div>
);
