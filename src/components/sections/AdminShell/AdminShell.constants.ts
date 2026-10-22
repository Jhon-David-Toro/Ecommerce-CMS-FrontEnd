import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TagIcon,
  TruckIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import type { AdminNavGroup } from "./AdminShell.types";

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", exact: true, icon: Squares2X2Icon }],
  },
  {
    title: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: ShoppingBagIcon },
      { label: "Categories", href: "/admin/categories", icon: RectangleStackIcon },
      { label: "Brands", href: "/admin/brands", icon: TagIcon },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders", icon: TruckIcon },
      { label: "Customers", href: "/admin/customers", icon: UsersIcon },
      { label: "Reviews", href: "/admin/reviews", icon: ChatBubbleLeftRightIcon },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Site content", href: "/admin/content", icon: PaintBrushIcon },
      { label: "Pages", href: "/admin/pages", icon: DocumentTextIcon },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
      { label: "Account", href: "/admin/account", icon: UserCircleIcon },
    ],
  },
];

export const ADMIN_NAV = ADMIN_NAV_GROUPS.flatMap((group) => group.items);

export const SIDEBAR_KEY = "adminSidebar";
