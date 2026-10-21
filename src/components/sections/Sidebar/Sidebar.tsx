"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { SidebarProps } from "./Sidebar.types";
import styles from "./Sidebar.module.scss";

/**
 * Sidebar: slide-in menu for small screens.
 *
 * @param props Component props.
 * @param props.isOpen Shows the menu.
 * @param props.toggleSidebar Called to open or close the menu.
 * @param props.menu Links of the menu.
 * @returns The menu dialog.
 */
export const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, menu }) => (
  <dialog role="dialog" open={isOpen} className={cx(styles.sidebar, { [styles.open]: isOpen })}>
    <strong className={styles.navbar__brand}>SHOP.COM</strong>
    <XMarkIcon
      className={styles.sidebar__close}
      onClick={toggleSidebar}
      data-testid="sidebar-close"
      role="button"
      aria-hidden={false}
      aria-label="Close menu"
    />
    <ul className={styles.sidebar__list}>
      {menu.map((item) => (
        <li key={item.label} className={styles.sidebar__item}>
          <Link href={item.href} className={styles.sidebar__link} onClick={toggleSidebar}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </dialog>
);
