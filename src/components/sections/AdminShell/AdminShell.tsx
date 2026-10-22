"use client";

import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { AdminShellProps } from "./AdminShell.types";
import { useAdminSession } from "./hooks/useAdminSession";
import { useSidebar } from "./hooks/useSidebar";
import { AdminSidebar } from "./parts/AdminSidebar";
import { AdminTopBar } from "./parts/AdminTopBar";
import styles from "./AdminShell.module.scss";

/**
 * AdminShell: frame of the admin panel with a collapsible sidebar (a drawer on small screens), the signed-in user and the page content.
 *
 * @param props Component props.
 * @param props.children Content of the current admin page.
 * @returns The admin frame.
 */
export const AdminShell: FC<AdminShellProps> = ({ children }) => {
  const { pathname, user, handleSignOut, handleSearch } = useAdminSession();
  const sidebar = useSidebar();

  return (
    <div className={cx(styles.shell, sidebar.isCollapsed && styles.shell_collapsed)}>
      <AdminSidebar
        pathname={pathname}
        isCollapsed={sidebar.isCollapsed}
        isOpen={sidebar.isOpen}
        onToggleCollapsed={sidebar.toggleCollapsed}
        onClose={sidebar.close}
      />
      {sidebar.isOpen && <button type="button" className={styles.shell__backdrop} aria-label="Dismiss menu" onClick={sidebar.close} />}
      <div className={styles.shell__body}>
        <AdminTopBar userName={user?.name} onSignOut={handleSignOut} onSearch={handleSearch} onMenuOpen={sidebar.open} />
        <main className={styles.shell__main}>{children}</main>
      </div>
    </div>
  );
};
