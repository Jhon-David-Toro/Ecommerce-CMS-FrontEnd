import { FC } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { HappyCardProps } from './HappyCard.types';
import { Rating } from "@/components/ui/Rating";
import styles from './HappyCard.module.scss';

export const HappyCard: FC<HappyCardProps> = ({ name, rating, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Rating rating={rating} size="medium" />
        <span className={styles.name}>{name} <CheckCircleIcon className={styles.name__check}/></span>
      </div>
      <p className={styles.text}>{`"${text}"`}</p>
    </div>
  );
};
