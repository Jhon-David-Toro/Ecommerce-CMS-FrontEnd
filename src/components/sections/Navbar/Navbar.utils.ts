import { ACCOUNT_HOME, ADMIN_HOME, ROLES } from "@/lib/auth/auth.constants";
import type { PublicUser } from "@/lib/auth/auth.types";

import { SEARCH_ROUTE } from "./Navbar.constants";

/**
 * Chooses where the account icon leads: the sign in page, the account or the admin panel.
 *
 * @param user Signed-in user, or null.
 * @returns The address to link to.
 */
export const getAccountHref = (user: PublicUser | null) => {
  if (!user) return "/login";
  return user.role === ROLES.admin ? ADMIN_HOME : ACCOUNT_HOME;
};

/**
 * Builds the address of the search results page.
 *
 * @param query Text typed in the search box.
 * @returns The address with the query encoded.
 */
export const getSearchHref = (query: string) => `${SEARCH_ROUTE}?q=${encodeURIComponent(query.trim())}`;
