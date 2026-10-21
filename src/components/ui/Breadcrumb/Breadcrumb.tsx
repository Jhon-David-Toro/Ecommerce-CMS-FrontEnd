import Link from "next/link";

import type { BreadcrumbProps } from "./Breadcrumb.types";
import styles from "./Breadcrumb.module.scss";

/**
 * Breadcrumb: trail of links that shows where the visitor is; the last item is the current page.
 *
 * @param props Component props.
 * @param props.items Steps of the trail, from the root to the current page.
 * @returns The trail.
 */
export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav className={styles.breadcrumb} aria-label="Breadcrumb">
    <ol className={styles.breadcrumb__list}>
      {items.map((item, index) => (
        <li key={item.label} className={styles.breadcrumb__item}>
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className={styles.breadcrumb__link}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
