import Link from "next/link";

import { ADMIN_NAV } from "../AdminShell.constants";
import type { AdminSidebarProps } from "../AdminShell.types";
import { AdminNavLink } from "./AdminNavLink";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/Sidebar: brand and navigation links of the admin panel.
 *
 * @param props Component props.
 * @param props.pathname Current path, to mark the active link.
 * @returns The sidebar.
 */
export const AdminSidebar = ({ pathname }: AdminSidebarProps) => (
  <aside className={styles.shell__sidebar}>
    <Link href="/admin" className={styles.shell__brand}>
      SHOP.CO <span>Admin</span>
    </Link>
    <nav aria-label="Admin">
      <ul className={styles.shell__nav}>
        {ADMIN_NAV.map((item) => (
          <AdminNavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  </aside>
);
