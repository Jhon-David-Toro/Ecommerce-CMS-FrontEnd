import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import styles from "../Navbar.module.scss";

/**
 * Navbar/Actions: cart and account icons.
 *
 * @returns The icon row.
 */
export const NavbarActions = () => (
  <section className={styles.navbar__right_icon}>
    <ShoppingCartIcon className={styles.navbar__icon} />
    <UserCircleIcon className={styles.navbar__icon} />
  </section>
);
