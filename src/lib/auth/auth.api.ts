import { createRepository } from "@/lib/mock/repository";
import { readJson, removeJson, writeJson } from "@/lib/shared/storage/storage";

import { AUTH_ERRORS, MIN_PASSWORD_LENGTH, ROLES, SEED_USERS, SESSION_STORAGE_KEY, USER_STORAGE_KEY } from "./auth.constants";
import type { Credentials, PublicUser, RegisterInput, User } from "./auth.types";

export const userRepository = createRepository<User>(USER_STORAGE_KEY, () =>
  SEED_USERS.map((seed, index) => ({ id: index + 1, ...seed, blocked: false, createdAt: Date.UTC(2025, 0, 1) })),
);

/**
 * Hides the password of a user.
 *
 * @param user Stored user.
 * @returns The user without password.
 */
export const toPublicUser = ({ id, name, email, role, blocked, createdAt }: User): PublicUser => ({
  id,
  name,
  email,
  role,
  blocked,
  createdAt,
});

/**
 * Lists the registered users.
 *
 * @returns Users without passwords.
 */
export const listUsers = async () => (await userRepository.list()).map(toPublicUser);

/**
 * Starts a session for a user.
 *
 * @param credentials Email and password.
 * @returns The signed-in user.
 */
export const login = async ({ email, password }: Credentials) => {
  const user = (await userRepository.list()).find((item) => item.email === email.trim().toLowerCase() && item.password === password);
  if (!user) throw new Error(AUTH_ERRORS.invalidCredentials);
  if (user.blocked) throw new Error(AUTH_ERRORS.blocked);
  writeJson(SESSION_STORAGE_KEY, { userId: user.id });
  return toPublicUser(user);
};

/**
 * Creates a customer account and signs it in.
 *
 * @param input Name, email and password.
 * @returns The new user.
 */
export const register = async ({ name, email, password }: RegisterInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error(AUTH_ERRORS.weakPassword);
  if ((await userRepository.list()).some((user) => user.email === normalizedEmail)) throw new Error(AUTH_ERRORS.emailTaken);
  const created = await userRepository.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: ROLES.customer,
    blocked: false,
    createdAt: Date.now(),
  });
  writeJson(SESSION_STORAGE_KEY, { userId: created.id });
  return toPublicUser(created);
};

/**
 * Ends the current session.
 */
export const logout = async () => removeJson(SESSION_STORAGE_KEY);

/**
 * Reads the user of the current session.
 *
 * @returns The signed-in user, or null.
 */
export const getCurrentUser = async () => {
  const session = readJson<{ userId: number } | null>(SESSION_STORAGE_KEY, null);
  const user = session ? await userRepository.getById(session.userId) : null;
  return user && !user.blocked ? toPublicUser(user) : null;
};

/**
 * Changes the role or the blocked flag of a user.
 *
 * @param id User id.
 * @param patch Fields to change.
 * @returns The updated user.
 */
export const updateUser = async (id: number, patch: Partial<Pick<User, "role" | "blocked" | "name">>) =>
  toPublicUser(await userRepository.update(id, patch));
