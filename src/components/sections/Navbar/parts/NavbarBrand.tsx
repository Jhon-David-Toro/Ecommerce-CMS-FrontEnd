import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { NavbarBrandProps } from "../Navbar.types";
import styles from "../Navbar.module.scss";

/**
 * Navbar/Brand: menu button for small screens and the store name linking home.
 *
 * @param props Component props.
 * @param props.onMenuClick Called when the menu button is pressed.
 * @returns The brand block.
 */
export const NavbarBrand = ({ onMenuClick }: NavbarBrandProps) => (
  <section className={styles.navbar__logo}>
    <Bars3Icon onClick={onMenuClick} className={styles.navbar__hamburger} role="button" aria-hidden={false} aria-label="Open menu" />
    <Link className={styles.navbar__brand} href="/">
      <strong>SHOP.COM</strong>
    </Link>
  </section>
);
