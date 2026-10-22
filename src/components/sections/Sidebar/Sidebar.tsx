"use client";

import Link from "next/link";
import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { SidebarProps } from "./Sidebar.types";
import { SidebarClose } from "./parts/SidebarClose";
import { SidebarLinks } from "./parts/SidebarLinks";
import { SidebarShortcuts } from "./parts/SidebarShortcuts";
import styles from "./Sidebar.module.scss";

/**
 * Sidebar: slide-in menu for small screens with the main links, shortcuts to the account and the cart, and a backdrop.
 *
 * @param props Component props.
 * @param props.isOpen Shows the menu.
 * @param props.toggleSidebar Called to open or close the menu.
 * @param props.menu Links of the menu.
 * @returns The menu dialog and its backdrop.
 */
export const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, menu }) => (
  <>
    {isOpen && <button type="button" className={styles.backdrop} aria-label="Dismiss menu" tabIndex={-1} onClick={toggleSidebar} />}
    <dialog role="dialog" open={isOpen} className={cx(styles.sidebar, { [styles.open]: isOpen })}>
      <div className={styles.sidebar__head}>
        <Link href="/" className={styles.sidebar__brand} onClick={toggleSidebar}>
          SHOP.CO
        </Link>
        <SidebarClose onClose={toggleSidebar} />
      </div>
      <SidebarLinks menu={menu} onNavigate={toggleSidebar} />
      <SidebarShortcuts onNavigate={toggleSidebar} />
    </dialog>
  </>
);
