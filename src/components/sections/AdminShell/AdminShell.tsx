"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FC } from "react";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/useAuth";
import { cx } from "@/lib/shared/classnames/cx";

import { ADMIN_NAV } from "./AdminShell.constants";
import type { AdminShellProps } from "./AdminShell.types";
import { isActiveLink } from "./AdminShell.utils";
import styles from "./AdminShell.module.scss";

/**
 * AdminShell: frame of the admin panel with a navigation sidebar, the signed-in user and the page content.
 *
 * @param props Component props.
 * @param props.children Content of the current admin page.
 * @returns The admin frame.
 */
export const AdminShell: FC<AdminShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  /**
   * Ends the session and goes back to the sign in page.
   */
  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.shell__sidebar}>
        <Link href="/admin" className={styles.shell__brand}>
          SHOP.CO <span>Admin</span>
        </Link>
        <nav aria-label="Admin">
          <ul className={styles.shell__nav}>
            {ADMIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(styles.shell__link, isActiveLink(pathname, item) && styles.active)}
                  aria-current={isActiveLink(pathname, item) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className={styles.shell__body}>
        <header className={styles.shell__top}>
          <Link href="/" className={styles.shell__store}>
            View store
          </Link>
          <span className={styles.shell__user}>{user?.name}</span>
          <Button type="secondary" size="small" text="Sign out" typeAttribute="button" onClick={handleSignOut} />
        </header>
        <main className={styles.shell__main}>{children}</main>
      </div>
    </div>
  );
};
