import { FC } from 'react';
import { FaqListProps } from './FaqList.types';
import FaqItem from '@/components/patterns/FaqItem/FaqItem';
import styles from './FaqList.module.scss';

const FaqList: FC<FaqListProps> = ({ faqs }) => {
  return (
    <ul className={styles.faq__list}>
      {faqs.map((faq) => (
        <FaqItem key={faq.id} faq={faq} />
      ))}
    </ul>
  );
};

export default FaqList;