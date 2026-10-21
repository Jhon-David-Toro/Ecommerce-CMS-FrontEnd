"use client";

import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";
import { useToggle } from "@/lib/shared/state/useToggle";

import type { FaqItemProps } from "./FaqItem.types";
import { getFaqIds } from "./FaqItem.utils";
import styles from "./FaqItem.module.scss";

/**
 * FaqItem: question that expands to show its answer.
 *
 * @param props Component props.
 * @param props.faq Question and answer to show.
 * @returns The expandable question.
 */
export const FaqItem: FC<FaqItemProps> = ({ faq }) => {
  const [isActive, toggleFaq] = useToggle();
  const ids = getFaqIds(faq.id);

  return (
    <li className={styles.faqItem}>
      <h3>
        <button
          className={cx(styles.faqItem__question, { [styles.active]: isActive })}
          onClick={toggleFaq}
          aria-expanded={isActive}
          aria-controls={ids.answer}
          id={ids.question}
        >
          {faq.question}
          <span className={styles.faqItem__icon} aria-hidden="true">
            {isActive ? "−" : "+"}
          </span>
        </button>
      </h3>
      <section
        id={ids.answer}
        className={cx(styles.faqItem__answer, { [styles.active]: isActive })}
        role="region"
        aria-labelledby={ids.question}
      >
        <p>{faq.answer}</p>
      </section>
    </li>
  );
};
