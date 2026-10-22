import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { SidebarHeadProps } from "../AdminShell.types";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/SidebarHead: brand of the sidebar and, on small screens, the button that closes the drawer.
 *
 * @param props Component props.
 * @param props.onClose Called when the brand is followed or the close button is pressed.
 * @returns The head of the sidebar.
 */
export const SidebarHead = ({ onClose }: SidebarHeadProps) => (
  <div className={styles.sidebar__head}>
    <Link href="/admin" className={styles.brand} aria-label="Admin home" onClick={onClose}>
      <span className={styles.brand__mark}>S</span>
      <span className={styles.brand__text}>
        SHOP.CO <small>Admin</small>
      </span>
    </Link>
    <button type="button" className={styles.sidebar__close} aria-label="Close menu" onClick={onClose}>
      <XMarkIcon />
    </button>
  </div>
);
