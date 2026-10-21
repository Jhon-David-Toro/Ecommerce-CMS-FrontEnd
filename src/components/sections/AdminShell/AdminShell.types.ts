import type { ComponentType, ReactNode } from "react";

export interface AdminNavItem {
  label: string;
  href: string;
  exact?: boolean;
  icon: ComponentType<{ className?: string }>;
}

export interface AdminShellProps {
  children: ReactNode;
}

export interface AdminSidebarProps {
  pathname: string;
}

export interface AdminNavLinkProps {
  item: AdminNavItem;
  pathname: string;
}

export interface AdminTopBarProps {
  userName?: string;
  onSignOut: () => void;
}
