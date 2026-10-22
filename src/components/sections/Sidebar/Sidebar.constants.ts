import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import type { SidebarShortcut } from "./Sidebar.types";

export const SIDEBAR_SHORTCUTS: SidebarShortcut[] = [
  { label: "My account", href: "/account", icon: UserCircleIcon },
  { label: "Cart", href: "/cart", icon: ShoppingCartIcon },
];
