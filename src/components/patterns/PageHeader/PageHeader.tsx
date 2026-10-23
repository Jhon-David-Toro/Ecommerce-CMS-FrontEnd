import type { FC } from "react";

import type { PageHeaderProps } from "./PageHeader.types";
import styles from "./PageHeader.module.scss";

/**
 * PageHeader: title and description of an admin page with room for its main actions.
 *
 * @param props Component props.
 * @param props.title Headline of the page.
 * @param props.description Short explanation under the title.
 * @param props.actions Buttons or links shown on the right.
 * @returns The page header.
 */
export const PageHeader: FC<PageHeaderProps> = ({ title, description, actions }) => (
  <header className={styles.header}>
    <div>
      <h1 className={styles.header__title}>{title}</h1>
      {description && <p className={styles.header__text}>{description}</p>}
    </div>
    {actions && <div className={styles.header__actions}>{actions}</div>}
  </header>
);
