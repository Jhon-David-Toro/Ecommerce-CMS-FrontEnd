import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

import type { CollapseButtonProps } from "../AdminShell.types";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/CollapseButton: switches the sidebar between its wide and icon-only forms.
 *
 * @param props Component props.
 * @param props.isCollapsed Whether the sidebar is collapsed.
 * @param props.onToggle Called when the button is pressed.
 * @returns The button.
 */
export const CollapseButton = ({ isCollapsed, onToggle }: CollapseButtonProps) => {
  const Icon = isCollapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  return (
    <button
      type="button"
      className={styles.sidebar__collapse}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={onToggle}
    >
      <Icon />
      <span className={styles.sidebar__collapseText}>Collapse</span>
    </button>
  );
};
