import Link from "next/link";

import { SIDEBAR_SHORTCUTS } from "../Sidebar.constants";
import type { SidebarShortcutsProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * Sidebar/Shortcuts: links to the account and the cart at the bottom of the menu.
 *
 * @param props Component props.
 * @param props.onNavigate Called when a link is followed, to close the menu.
 * @returns The shortcuts.
 */
export const SidebarShortcuts = ({ onNavigate }: SidebarShortcutsProps) => (
  <div className={styles.sidebar__shortcuts}>
    {SIDEBAR_SHORTCUTS.map(({ label, href, icon: Icon }) => (
      <Link key={href} href={href} className={styles.sidebar__shortcut} onClick={onNavigate}>
        <Icon /> {label}
      </Link>
    ))}
  </div>
);
