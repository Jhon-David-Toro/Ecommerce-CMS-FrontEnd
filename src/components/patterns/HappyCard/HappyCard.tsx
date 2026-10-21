import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";

import { Rating } from "@/components/ui/Rating";

import type { HappyCardProps } from "./HappyCard.types";
import styles from "./HappyCard.module.scss";

/**
 * Card/Happy: review of a satisfied customer with a verified badge.
 *
 * @param props Component props.
 * @param props.name Customer name.
 * @param props.rating Rating between 0 and 5.
 * @param props.text Review text.
 * @returns The review card.
 */
export const HappyCard: FC<HappyCardProps> = ({ name, rating, text }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <Rating rating={rating} size="medium" />
      <span className={styles.name}>
        {name} <CheckCircleIcon className={styles.name__check} />
      </span>
    </div>
    <p className={styles.text}>{`"${text}"`}</p>
  </div>
);
