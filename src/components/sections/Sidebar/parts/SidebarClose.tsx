import { XMarkIcon } from "@heroicons/react/24/outline";

import type { SidebarCloseProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * Sidebar/Close: round button that closes the menu.
 *
 * @param props Component props.
 * @param props.onClose Called when the button is pressed.
 * @returns The button.
 */
export const SidebarClose = ({ onClose }: SidebarCloseProps) => (
  <button type="button" className={styles.sidebar__close} data-testid="sidebar-close" aria-label="Close menu" onClick={onClose}>
    <XMarkIcon />
  </button>
);
