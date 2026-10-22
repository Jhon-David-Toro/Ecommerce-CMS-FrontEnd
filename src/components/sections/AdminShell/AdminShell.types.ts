import type { ComponentType, ReactNode } from "react";

export interface AdminNavItem {
  label: string;
  href: string;
  exact?: boolean;
  icon: ComponentType<{ className?: string }>;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export interface AdminShellProps {
  children: ReactNode;
}

export interface AdminSidebarProps {
  pathname: string;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggleCollapsed: () => void;
  onClose: () => void;
}

export interface AdminNavGroupProps {
  group: AdminNavGroup;
  pathname: string;
  onNavigate: () => void;
}

export interface AdminNavLinkProps {
  item: AdminNavItem;
  pathname: string;
  onNavigate: () => void;
}

export interface AdminTopBarProps {
  userName?: string;
  onSignOut: () => void;
  onSearch: (text: string) => void;
  onMenuOpen: () => void;
}

export interface AdminSearchProps {
  onSearch: (text: string) => void;
}

export interface AdminProfileProps {
  userName?: string;
}

export interface SidebarHeadProps {
  onClose: () => void;
}

export interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface AdminMenuButtonProps {
  onOpen: () => void;
}
