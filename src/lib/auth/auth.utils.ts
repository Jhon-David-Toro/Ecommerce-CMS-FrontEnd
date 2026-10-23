import { ACCOUNT_HOME, ADMIN_HOME, ROLES } from "./auth.constants";
import type { PublicUser } from "./auth.types";

/**
 * Accepts a return path only when it stays inside the site, so a link cannot send users elsewhere after signing in.
 *
 * @param next Path from the query string.
 * @returns The path, or null when it is missing or unsafe.
 */
export const getSafeNext = (next: string | null) => (next && next.startsWith("/") && !next.startsWith("//") ? next : null);

/**
 * Chooses where to send a user after signing in.
 *
 * @param user User that just signed in.
 * @param next Path from the query string.
 * @returns The return path when safe, otherwise the admin panel or the account page.
 */
export const getPostLoginHref = (user: PublicUser, next: string | null) =>
  getSafeNext(next) ?? (user.role === ROLES.admin ? ADMIN_HOME : ACCOUNT_HOME);

/**
 * Reads the message of a failure.
 *
 * @param error Value that was thrown.
 * @param fallback Message to use when the failure has none.
 * @returns The message of the error, or the fallback.
 */
export const getErrorMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);
