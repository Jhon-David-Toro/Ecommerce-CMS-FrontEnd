import type { PublicUser } from "@/lib/auth/auth.types";

/**
 * Tells whether a user matches the text typed in the search box.
 *
 * @param user User to check.
 * @param text Search text, already lowercase.
 * @returns True when the name or email contains the text.
 */
export const matchesUser = (user: PublicUser, text: string) => [user.name, user.email].some((value) => value.toLowerCase().includes(text));
