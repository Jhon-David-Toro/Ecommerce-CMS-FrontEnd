import { useAuthStore } from "./authStore";

/**
 * Tells whether the signed-in user is an administrator, to choose between the admin and the public endpoints of the API.
 *
 * @returns True for administrators.
 */
export const isAdminSession = () => useAuthStore.getState().user?.role === "admin";
