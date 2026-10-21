import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/useAuth";

import { buildSearchHref } from "../AdminShell.utils";

/**
 * Gives the admin frame the current path, the signed-in user and a way to sign out and to search.
 *
 * @returns The path, the user and the sign out and search handlers.
 */
export const useAdminSession = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  /**
   * Ends the session and goes back to the sign in page.
   */
  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  /**
   * Opens the product list filtered by the text typed in the top bar.
   *
   * @param text Text to look for.
   */
  const handleSearch = (text: string) => router.push(buildSearchHref(text));

  return { pathname, user, handleSignOut, handleSearch };
};
