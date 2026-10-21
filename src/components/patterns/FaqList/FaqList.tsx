import type { FC } from "react";

import { FaqItem } from "@/components/patterns/FaqItem";

import type { FaqListProps } from "./FaqList.types";
import styles from "./FaqList.module.scss";

/**
 * FaqList: list of expandable questions.
 *
 * @param props Component props.
 * @param props.faqs Questions to list.
 * @returns The list.
 */
export const FaqList: FC<FaqListProps> = ({ faqs }) => (
  <ul className={styles.faq__list}>
    {faqs.map((faq) => (
      <FaqItem key={faq.id} faq={faq} />
    ))}
  </ul>
);
