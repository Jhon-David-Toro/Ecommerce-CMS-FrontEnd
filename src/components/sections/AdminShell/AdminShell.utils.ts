import type { AdminNavItem } from "./AdminShell.types";

/**
 * Tells whether a navigation item matches the current address.
 *
 * @param pathname Current path.
 * @param item Navigation item.
 * @returns True for an exact match, or when the path is inside the section of the item.
 */
export const isActiveLink = (pathname: string, { href, exact }: Pick<AdminNavItem, "href" | "exact">) =>
  exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Gives the letter shown inside the avatar of the signed-in user.
 *
 * @param name Name of the user.
 * @returns The first letter in upper case, or an empty string without a name.
 */
export const getInitial = (name?: string) => name?.trim().charAt(0).toUpperCase() ?? "";

/**
 * Builds the address of the product list for a search typed in the top bar.
 *
 * @param text Text to look for.
 * @returns The products address, with the text as the `q` parameter when there is any.
 */
export const buildSearchHref = (text: string) => (text.trim() ? `/admin/products?q=${encodeURIComponent(text.trim())}` : "/admin/products");
