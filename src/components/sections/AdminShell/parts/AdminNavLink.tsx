import Link from "next/link";

import { cx } from "@/lib/shared/classnames/cx";

import type { AdminNavLinkProps } from "../AdminShell.types";
import { isActiveLink } from "../AdminShell.utils";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/NavLink: link of the sidebar with its icon and label; the link of the current section is dark.
 * When the sidebar is collapsed the label is hidden and the title shows it on hover.
 *
 * @param props Component props.
 * @param props.item Navigation item.
 * @param props.pathname Current path.
 * @param props.onNavigate Called when the link is followed, to close the drawer on small screens.
 * @returns The list item.
 */
export const AdminNavLink = ({ item, pathname, onNavigate }: AdminNavLinkProps) => {
  const active = isActiveLink(pathname, item);

  return (
    <li>
      <Link
        href={item.href}
        className={cx(styles.link, active && styles.link_active)}
        aria-label={item.label}
        title={item.label}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        <item.icon className={styles.link__icon} />
        <span className={styles.link__label}>{item.label}</span>
      </Link>
    </li>
  );
};
