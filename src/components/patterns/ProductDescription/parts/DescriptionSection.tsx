import { cx } from "@/lib/shared/classnames/cx";

import { SECTION_KINDS } from "../ProductDescription.constants";
import type { DescriptionSectionProps } from "../ProductDescription.types";
import styles from "../ProductDescription.module.scss";

/**
 * ProductDescription/Section: titled block of paragraphs or bullet points.
 *
 * @param props Component props.
 * @param props.section Title, kind and content of the section.
 * @returns The section.
 */
export const DescriptionSection = ({ section }: DescriptionSectionProps) => (
  <section className={styles.details__section}>
    <h3 className={styles.details__section__subtitle}>{section.title}</h3>
    {section.kind === SECTION_KINDS.list ? (
      <ul className={styles.details__section__featureList}>
        {section.items.map((item) => (
          <li key={item} className={styles.details__section__featureList__featureItem}>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      section.items.map((item, index) => (
        <p
          key={item}
          className={cx(styles.details__section__text, section.emphasizeFirst && index === 0 && styles["details__section__text--companyName"])}
        >
          {item}
        </p>
      ))
    )}
  </section>
);
