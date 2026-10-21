import { SECTION_KINDS } from "../ProductDescription.constants";
import type { DescriptionSectionProps } from "../ProductDescription.types";
import styles from "../ProductDescription.module.scss";
import { DescriptionList } from "./DescriptionList";
import { DescriptionText } from "./DescriptionText";

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
    {section.kind === SECTION_KINDS.list ? <DescriptionList items={section.items} /> : <DescriptionText section={section} />}
  </section>
);
