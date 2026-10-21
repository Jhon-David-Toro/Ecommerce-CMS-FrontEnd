import type { MenuItem } from "@/lib/site/menuItem.types";

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  menu: MenuItem[];
}
