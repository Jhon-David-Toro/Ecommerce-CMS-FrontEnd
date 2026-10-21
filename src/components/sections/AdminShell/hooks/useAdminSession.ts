import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/useAuth";

/**
 * Gives the admin frame the current path, the signed-in user and a way to sign out.
 *
 * @returns The path, the user and the sign out handler.
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

  return { pathname, user, handleSignOut };
};
