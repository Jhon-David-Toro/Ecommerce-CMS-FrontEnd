import { cx } from "@/lib/shared/classnames/cx";

import type { DescriptionSectionProps } from "../ProductDescription.types";
import styles from "../ProductDescription.module.scss";

/**
 * ProductDescription/Text: paragraphs of a section, optionally emphasizing the first one.
 *
 * @param props Component props.
 * @param props.section Section whose paragraphs are drawn.
 * @returns The paragraphs.
 */
export const DescriptionText = ({ section }: DescriptionSectionProps) => (
  <>
    {section.items.map((item, index) => (
      <p
        key={item}
        className={cx(styles.details__section__text, section.emphasizeFirst && index === 0 && styles["details__section__text--companyName"])}
      >
        {item}
      </p>
    ))}
  </>
);
