"use client";

import type { FC } from "react";

import menuData from "@/assets/menu.json";
import { Sidebar } from "@/components/sections/Sidebar";
import { useToggle } from "@/lib/shared/state/useToggle";
import type { MenuData } from "@/lib/site/menu.types";

import { NavbarActions } from "./parts/NavbarActions";
import { NavbarBrand } from "./parts/NavbarBrand";
import { NavbarLinks } from "./parts/NavbarLinks";
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
          <NavbarLinks items={data.navbar} />
          <NavbarSearch />
          <NavbarActions />
        </ul>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menu={data.sidebar} />
      </nav>
    </header>
  );
};
