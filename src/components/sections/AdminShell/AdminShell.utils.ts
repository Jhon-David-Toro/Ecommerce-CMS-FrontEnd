import type { AdminNavItem } from "./AdminShell.types";

/**
 * Tells whether a navigation item matches the current address.
 *
 * @param pathname Current path.
 * @param item Navigation item.
 * @returns True for an exact match, or when the path is inside the section of the item.
 */
export const isActiveLink = (pathname: string, { href, exact }: AdminNavItem) =>
  exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
