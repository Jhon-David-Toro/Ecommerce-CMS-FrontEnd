import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { SEARCH_LABEL } from "../Navbar.constants";
import styles from "../Navbar.module.scss";

/**
 * Navbar/Search: product search box.
 *
 * @returns The search box.
 */
export const NavbarSearch = () => (
  <section className={styles.navbar__search}>
    <label htmlFor="search" className={styles.navbar__search_icon}>
      <MagnifyingGlassIcon />
    </label>
    <input
      type="text"
      id="search"
      name="search"
      placeholder={`${SEARCH_LABEL}...`}
      aria-label={SEARCH_LABEL}
      className={styles.navbar__search_input}
    />
  </section>
);
