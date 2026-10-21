"use client";

import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useCart } from "@/lib/cart/useCart";
import { useAuth } from "@/lib/auth/useAuth";

import { getAccountHref } from "../Navbar.utils";
import styles from "../Navbar.module.scss";

/**
 * Navbar/Actions: cart link with the number of units and the account or sign in link.
 *
 * @returns The icon row.
 */
export const NavbarActions = () => {
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <section className={styles.navbar__right_icon}>
      <Link href="/cart" className={styles.navbar__iconLink} aria-label={`Cart, ${count} items`}>
        <ShoppingCartIcon className={styles.navbar__icon} />
        {count > 0 && <span className={styles.navbar__badge}>{count}</span>}
      </Link>
      <Link href={getAccountHref(user)} className={styles.navbar__iconLink} aria-label={user ? "My account" : "Sign in"}>
        <UserCircleIcon className={styles.navbar__icon} />
      </Link>
    </section>
  );
};
