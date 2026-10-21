import type { DescriptionListProps } from "../ProductDescription.types";
import styles from "../ProductDescription.module.scss";

/**
 * ProductDescription/List: bullet points of a section.
 *
 * @param props Component props.
 * @param props.items Text of each bullet point.
 * @returns The list.
 */
export const DescriptionList = ({ items }: DescriptionListProps) => (
  <ul className={styles.details__section__featureList}>
    {items.map((item) => (
      <li key={item} className={styles.details__section__featureList__featureItem}>
        {item}
      </li>
    ))}
  </ul>
);
