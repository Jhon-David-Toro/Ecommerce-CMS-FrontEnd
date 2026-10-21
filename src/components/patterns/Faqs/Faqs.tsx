import { FC } from 'react';
import { FaqsProps } from './Faqs.types';
import FaqList from '@/components/patterns/FaqList/FaqList';
import styles from './Faqs.module.scss';

const Faqs: FC<FaqsProps> = ({ faqs }) => {
  return (
    <section className={styles.faqs} aria-labelledby="faqs-title">
      <div className={styles.faqs__container}>
        <h2 id="faqs-title" className={styles.faqs__container_title}>
          Frequently Asked Questions
        </h2>
        {faqs?.length ? (
          <FaqList faqs={faqs} />
        ) : (
          <p className={styles.faqs__noFaqs}>No FAQs available at this time.</p>
        )}
      </div>
    </section>
  );
};

export default Faqs;