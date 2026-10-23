"use client";

import type { FC } from "react";

import { Sidebar } from "@/components/sections/Sidebar";
import { useSiteContent } from "@/lib/content/useSiteContent";
import { useToggle } from "@/lib/shared/state/useToggle";

import { NavbarActions } from "./parts/NavbarActions";
import { NavbarBrand } from "./parts/NavbarBrand";
import { NavbarLinks } from "./parts/NavbarLinks";
import { NavbarSearch } from "./parts/NavbarSearch";
import styles from "./Navbar.module.scss";

/**
 * Navbar: brand, main links, search box and account and cart icons, with a sidebar menu on small screens.
 *
 * @returns The page header.
 */
export const Navbar: FC = () => {
  const [isSidebarOpen, toggleSidebar] = useToggle();
  const { navbar, sidebar } = useSiteContent();

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbar__container}>
        <ul className={styles.navbar__list}>
          <NavbarBrand onMenuClick={toggleSidebar} />
          <NavbarLinks items={navbar} />
          <NavbarSearch />
          <NavbarActions />
        </ul>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menu={sidebar} />
      </nav>
    </header>
  );
};
