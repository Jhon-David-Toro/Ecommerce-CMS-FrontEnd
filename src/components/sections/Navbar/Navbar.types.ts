import type { MenuItem } from "@/lib/site/menuItem.types";

export interface NavbarBrandProps {
  onMenuClick: () => void;
}

export interface NavbarLinksProps {
  items: MenuItem[];
}
