"use client";

import Link from "next/link";
import type { FC } from "react";

import menuData from "@/assets/menu.json";
import { Sidebar } from "@/components/sections/Sidebar";
import type { MenuData } from "@/lib/site/menu.types";
import { useToggle } from "@/lib/shared/state/useToggle";

import { NavbarActions } from "./parts/NavbarActions";
import { NavbarBrand } from "./parts/NavbarBrand";
import { NavbarSearch } from "./parts/NavbarSearch";
import styles from "./Navbar.module.scss";

/**
 * Navbar: brand, main links, search box and account icons, with a sidebar menu on small screens.
 *
 * @returns The page header.
 */
export const Navbar: FC = () => {
  const [isSidebarOpen, toggleSidebar] = useToggle();
  const data: MenuData = menuData;

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbar__container}>
        <ul className={styles.navbar__list}>
          <NavbarBrand onMenuClick={toggleSidebar} />
          {data.navbar.map((item) => (
            <li key={item.label} className={styles.navbar__item}>
              <Link href={item.href} className={styles.navbar__link}>
                {item.label}
              </Link>
            </li>
          ))}
          <NavbarSearch />
          <NavbarActions />
        </ul>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menu={data.sidebar} />
      </nav>
    </header>
  );
};
