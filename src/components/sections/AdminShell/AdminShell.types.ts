import type { ReactNode } from "react";

export interface AdminNavItem {
  label: string;
  href: string;
  exact?: boolean;
}

export interface AdminShellProps {
  children: ReactNode;
}
