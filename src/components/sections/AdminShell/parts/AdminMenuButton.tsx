import { Bars3Icon } from "@heroicons/react/24/outline";

import type { AdminMenuButtonProps } from "../AdminShell.types";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/MenuButton: opens the navigation drawer on small screens.
 *
 * @param props Component props.
 * @param props.onOpen Called when the button is pressed.
 * @returns The button.
 */
export const AdminMenuButton = ({ onOpen }: AdminMenuButtonProps) => (
  <button type="button" className={styles.shell__menu} aria-label="Open menu" onClick={onOpen}>
    <Bars3Icon />
  </button>
);
