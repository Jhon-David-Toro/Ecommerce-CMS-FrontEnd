/**
 * Builds the sign in address that brings the user back to a page afterwards.
 *
 * @param next Path to return to once signed in.
 * @returns The sign in address with the return path.
 */
export const buildLoginHref = (next: string) => `/login?next=${encodeURIComponent(next)}`;
