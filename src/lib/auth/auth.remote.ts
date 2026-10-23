import type { Repository } from "@/lib/mock/repository.types";
import { ApiError } from "@/lib/shared/http/ApiError";
import { HTTP_STATUS, UNSUPPORTED_MESSAGE } from "@/lib/shared/http/api.constants";
import { apiRequest } from "@/lib/shared/http/apiClient";
import { clearToken, getToken, setToken } from "@/lib/shared/http/token";

import type { AuthResponse, Credentials, PublicUser, RegisterInput, User } from "./auth.types";

/**
 * Keeps the token of an answer that signs somebody in.
 *
 * @param response Answer of the login or register endpoints.
 * @returns The signed-in user.
 */
export const startSession = ({ token, user }: AuthResponse) => {
  setToken(token);
  return user;
};

/**
 * Lists the registered users (administrators only).
 *
 * @returns The users.
 */
export const listUsers = () => apiRequest<PublicUser[]>("/api/admin/users");

/**
 * Starts a session for a user.
 *
 * @param credentials Email and password.
 * @returns The signed-in user.
 */
export const login = async (credentials: Credentials) =>
  startSession(await apiRequest<AuthResponse>("/api/auth/login", { method: "POST", body: credentials }));

/**
 * Creates a customer account and signs it in.
 *
 * @param input Name, email and password.
 * @returns The new user.
 */
export const register = async (input: RegisterInput) =>
  startSession(await apiRequest<AuthResponse>("/api/auth/register", { method: "POST", body: input }));

/**
 * Ends the current session.
 */
export const logout = async () => clearToken();

/**
 * Reads the user of the current session; an expired or rejected token ends the session.
 *
 * @returns The signed-in user, or null.
 */
export const getCurrentUser = async () => {
  if (!getToken()) return null;

  try {
    return await apiRequest<PublicUser>("/api/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_STATUS.unauthorized) clearToken();
    return null;
  }
};

/**
 * Blocks or unblocks a user (administrators only); the API does not change roles or names from here.
 *
 * @param id User id.
 * @param patch Fields to change.
 * @param patch.blocked New blocked state.
 * @returns The updated user.
 */
export const updateUser = (id: number, patch: Partial<Pick<User, "role" | "blocked" | "name">>) =>
  apiRequest<PublicUser>(`/api/admin/users/${id}/blocked`, { method: "PATCH", body: { blocked: Boolean(patch.blocked) } });

/**
 * Changes the name and email of the signed-in user.
 *
 * @param id User id, not needed because the API uses the session.
 * @param input New name and email.
 * @returns The updated user.
 */
export const updateProfile = (id: number, input: { name: string; email: string }) =>
  apiRequest<PublicUser>("/api/auth/profile", { method: "PUT", body: input });

/**
 * Changes the password of the signed-in user.
 *
 * @param id User id, not needed because the API uses the session.
 * @param current Current password.
 * @param next New password.
 */
export const changePassword = (id: number, current: string, next: string) =>
  apiRequest<void>("/api/auth/password", { method: "PUT", body: { current, next } });

export const userRepository = {
  list: listUsers,
  update: updateUser,
  getById: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
  create: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
  remove: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
  save: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
} as unknown as Repository<User>;
