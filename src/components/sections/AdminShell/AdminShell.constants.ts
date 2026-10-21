import type { AdminNavItem } from "./AdminShell.types";

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", exact: true },
  { label: "Products", href: "/admin/products" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Brands", href: "/admin/brands" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Site content", href: "/admin/content" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Settings", href: "/admin/settings" },
];
