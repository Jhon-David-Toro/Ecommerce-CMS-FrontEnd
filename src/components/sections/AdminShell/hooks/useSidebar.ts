import { useState } from "react";

import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { SIDEBAR_KEY } from "../AdminShell.constants";

/**
 * Keeps the state of the sidebar: collapsed to icons on wide screens (remembered in the browser) and open as a drawer on small ones.
 *
 * @returns Whether it is collapsed or open, and the functions that change both.
 */
export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => readJson(SIDEBAR_KEY, false));
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Switches between the wide sidebar and the icon-only one and saves the choice.
   */
  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    writeJson(SIDEBAR_KEY, next);
  };

  /**
   * Opens the drawer.
   */
  const open = () => setIsOpen(true);

  /**
   * Closes the drawer.
   */
  const close = () => setIsOpen(false);

  return { isCollapsed, isOpen, toggleCollapsed, open, close };
};
