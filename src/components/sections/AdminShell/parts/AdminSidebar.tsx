import { cx } from "@/lib/shared/classnames/cx";

import { ADMIN_NAV_GROUPS } from "../AdminShell.constants";
import type { AdminSidebarProps } from "../AdminShell.types";
import { AdminNavGroup } from "./AdminNavGroup";
import { CollapseButton } from "./CollapseButton";
import { SidebarHead } from "./SidebarHead";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/Sidebar: brand, grouped navigation and the button that collapses it; a drawer on small screens.
 *
 * @param props Component props.
 * @param props.pathname Current path, to mark the active link.
 * @param props.isCollapsed Shows only icons on wide screens.
 * @param props.isOpen Shows the drawer on small screens.
 * @param props.onToggleCollapsed Called when the collapse button is pressed.
 * @param props.onClose Called to close the drawer.
 * @returns The sidebar.
 */
export const AdminSidebar = ({ pathname, isCollapsed, isOpen, onToggleCollapsed, onClose }: AdminSidebarProps) => (
  <aside className={cx(styles.sidebar, isOpen && styles.sidebar_open)}>
    <SidebarHead onClose={onClose} />
    <nav className={styles.sidebar__nav} aria-label="Admin">
      {ADMIN_NAV_GROUPS.map((group) => (
        <AdminNavGroup key={group.title} group={group} pathname={pathname} onNavigate={onClose} />
      ))}
    </nav>
    <CollapseButton isCollapsed={isCollapsed} onToggle={onToggleCollapsed} />
  </aside>
);
