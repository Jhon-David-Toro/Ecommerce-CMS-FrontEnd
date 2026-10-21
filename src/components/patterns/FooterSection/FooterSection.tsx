import Link from "next/link";
import type { FC } from "react";

import type { FooterSectionProps } from "./FooterSection.types";
import { getFooterSectionId } from "./FooterSection.utils";
import styles from "./FooterSection.module.scss";

/**
 * FooterSection: titled column of footer links.
 *
 * @param props Component props.
 * @param props.section Title and links of the column.
 * @returns The footer column.
 */
export const FooterSection: FC<FooterSectionProps> = ({ section }) => {
  const id = getFooterSectionId(section.title);

  return (
    <section className={styles.footerSection} aria-labelledby={id}>
      <h3 className={styles.footerSection__title} id={id}>
        {section.title}
      </h3>
      <ul className={styles.footerSection__list}>
        {section.links.map((link) => (
          <li className={styles.footerSection__list_li} key={link.label}>
            <Link href={link.href} className={styles.footerSection__link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
