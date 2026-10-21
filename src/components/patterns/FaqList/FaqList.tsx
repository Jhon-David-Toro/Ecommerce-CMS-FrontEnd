import { FC } from 'react';
import { FaqListProps } from './FaqList.types';
import { FaqItem } from "@/components/patterns/FaqItem";
import styles from './FaqList.module.scss';

export const FaqList: FC<FaqListProps> = ({ faqs }) => {
  return (
    <ul className={styles.faq__list}>
      {faqs.map((faq) => (
        <FaqItem key={faq.id} faq={faq} />
      ))}
    </ul>
  );
};
