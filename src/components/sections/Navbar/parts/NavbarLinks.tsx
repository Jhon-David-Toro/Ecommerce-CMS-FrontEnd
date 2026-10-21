import Link from "next/link";

import type { NavbarLinksProps } from "../Navbar.types";
import styles from "../Navbar.module.scss";

/**
 * Navbar/Links: main navigation links.
 *
 * @param props Component props.
 * @param props.items Links to draw.
 * @returns The list items.
 */
export const NavbarLinks = ({ items }: NavbarLinksProps) => (
  <>
    {items.map((item) => (
      <li key={item.label} className={styles.navbar__item}>
        <Link href={item.href} className={styles.navbar__link}>
          {item.label}
        </Link>
      </li>
    ))}
  </>
);
