import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import type { AdminNavItem } from "./AdminShell.types";

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", exact: true, icon: Squares2X2Icon },
  { label: "Products", href: "/admin/products", icon: ShoppingBagIcon },
  { label: "Categories", href: "/admin/categories", icon: RectangleStackIcon },
  { label: "Brands", href: "/admin/brands", icon: TagIcon },
  { label: "Orders", href: "/admin/orders", icon: TruckIcon },
  { label: "Customers", href: "/admin/customers", icon: UsersIcon },
  { label: "Reviews", href: "/admin/reviews", icon: ChatBubbleLeftRightIcon },
  { label: "Site content", href: "/admin/content", icon: PaintBrushIcon },
  { label: "Pages", href: "/admin/pages", icon: DocumentTextIcon },
  { label: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
  { label: "Account", href: "/admin/account", icon: UserCircleIcon },
];
