import { create } from "zustand";

import { getCurrentUser, login, logout, register } from "./auth.api";
import type { AuthState } from "./auth.types";

/**
 * Store with the signed-in user. Call `hydrate` once on the client to restore the session.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isReady: false,
  hydrate: async () => set({ user: await getCurrentUser(), isReady: true }),
  signIn: async (credentials) => {
    const user = await login(credentials);
    set({ user, isReady: true });
    return user;
  },
  signUp: async (input) => {
    const user = await register(input);
    set({ user, isReady: true });
    return user;
  },
  signOut: async () => {
    await logout();
    set({ user: null });
  },
}));
