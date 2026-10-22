import type { AdminNavGroupProps } from "../AdminShell.types";
import { AdminNavLink } from "./AdminNavLink";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/NavGroup: a titled set of links of the sidebar.
 *
 * @param props Component props.
 * @param props.group Title and links of the group.
 * @param props.pathname Current path, to mark the active link.
 * @param props.onNavigate Called when a link is followed.
 * @returns The group.
 */
export const AdminNavGroup = ({ group, pathname, onNavigate }: AdminNavGroupProps) => (
  <div className={styles.group}>
    <p className={styles.group__title}>{group.title}</p>
    <ul className={styles.group__list}>
      {group.items.map((item) => (
        <AdminNavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
      ))}
    </ul>
  </div>
);
