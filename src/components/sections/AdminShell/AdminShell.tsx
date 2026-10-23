"use client";

import type { FC } from "react";

import type { AdminShellProps } from "./AdminShell.types";
import { useAdminSession } from "./hooks/useAdminSession";
import { AdminSidebar } from "./parts/AdminSidebar";
import { AdminTopBar } from "./parts/AdminTopBar";
import styles from "./AdminShell.module.scss";

/**
 * AdminShell: frame of the admin panel with a navigation sidebar, the signed-in user and the page content.
 *
 * @param props Component props.
 * @param props.children Content of the current admin page.
 * @returns The admin frame.
 */
export const AdminShell: FC<AdminShellProps> = ({ children }) => {
  const { pathname, user, handleSignOut, handleSearch } = useAdminSession();

  return (
    <div className={styles.shell}>
      <AdminSidebar pathname={pathname} />
      <div className={styles.shell__body}>
        <AdminTopBar userName={user?.name} onSignOut={handleSignOut} onSearch={handleSearch} />
        <main className={styles.shell__main}>{children}</main>
      </div>
    </div>
  );
};
