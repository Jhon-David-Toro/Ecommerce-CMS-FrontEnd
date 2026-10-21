import Link from "next/link";

import { cx } from "@/lib/shared/classnames/cx";

import type { AdminNavLinkProps } from "../AdminShell.types";
import { isActiveLink } from "../AdminShell.utils";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/NavLink: one link of the sidebar; the link of the current section is highlighted.
 *
 * @param props Component props.
 * @param props.item Navigation item.
 * @param props.pathname Current path.
 * @returns The list item.
 */
export const AdminNavLink = ({ item, pathname }: AdminNavLinkProps) => {
  const active = isActiveLink(pathname, item);

  return (
    <li>
      <Link href={item.href} className={cx(styles.shell__link, active && styles.active)} aria-current={active ? "page" : undefined}>
        <item.icon className={styles.shell__icon} />
        {item.label}
      </Link>
    </li>
  );
};
