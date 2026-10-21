import type { FC } from "react";

import { FaqList } from "@/components/patterns/FaqList";

import type { FaqsProps } from "./Faqs.types";
import styles from "./Faqs.module.scss";

/**
 * Faqs: frequently asked questions section, with a notice when there are none.
 *
 * @param props Component props.
 * @param props.faqs Questions to show.
 * @returns The FAQ section.
 */
export const Faqs: FC<FaqsProps> = ({ faqs }) => (
  <section className={styles.faqs} aria-labelledby="faqs-title">
    <div className={styles.faqs__container}>
      <h2 id="faqs-title" className={styles.faqs__container_title}>
        Frequently Asked Questions
      </h2>
      {faqs?.length ? <FaqList faqs={faqs} /> : <p className={styles.faqs__noFaqs}>No FAQs available at this time.</p>}
    </div>
  </section>
);
