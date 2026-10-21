import { useEffect } from "react";

import { useAuthStore } from "./authStore";

/**
 * Gives access to the auth store and restores the session the first time it is used.
 *
 * @returns The signed-in user, whether the session was already checked and the auth actions.
 */
export const useAuth = () => {
  const { user, isReady, hydrate, signIn, signUp, signOut } = useAuthStore();

  useEffect(() => {
    if (!isReady) void hydrate();
  }, [isReady, hydrate]);

  return { user, isReady, signIn, signUp, signOut };
};
