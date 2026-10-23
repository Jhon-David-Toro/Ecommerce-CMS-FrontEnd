import type { ComponentType } from "react";

import type { MenuItem } from "@/lib/site/menuItem.types";

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  menu: MenuItem[];
}

export interface SidebarShortcut {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SidebarCloseProps {
  onClose: () => void;
}

export interface SidebarLinksProps {
  menu: MenuItem[];
  onNavigate: () => void;
}

export interface SidebarShortcutsProps {
  onNavigate: () => void;
}
