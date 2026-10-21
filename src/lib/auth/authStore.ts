import { create } from "zustand";

import { changePassword, getCurrentUser, login, logout, register, updateProfile } from "./auth.api";
import type { AuthState } from "./auth.types";

/**
 * Store with the signed-in user. Call `hydrate` once on the client to restore the session.
 */
export const useAuthStore = create<AuthState>((set, get) => ({
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
  saveProfile: async (input) => {
    const user = await updateProfile(get().user?.id ?? -1, input);
    set({ user });
    return user;
  },
  savePassword: async ({ current, next }) => changePassword(get().user?.id ?? -1, current, next),
}));
