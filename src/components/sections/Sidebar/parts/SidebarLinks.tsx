import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { SidebarLinksProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * Sidebar/Links: the main links of the menu, one row each with an arrow.
 *
 * @param props Component props.
 * @param props.menu Links of the menu.
 * @param props.onNavigate Called when a link is followed, to close the menu.
 * @returns The list of links.
 */
export const SidebarLinks = ({ menu, onNavigate }: SidebarLinksProps) => (
  <ul className={styles.sidebar__list}>
    {menu.map((item) => (
      <li key={item.label}>
        <Link href={item.href} className={styles.sidebar__link} onClick={onNavigate}>
          {item.label}
          <ChevronRightIcon />
        </Link>
      </li>
    ))}
  </ul>
);
