import { readJson, removeJson, writeJson } from "@/lib/shared/storage/storage";

import { TOKEN_STORAGE_KEY } from "./api.constants";

/**
 * Reads the token of the session.
 *
 * @returns The token, or null when nobody is signed in.
 */
export const getToken = () => readJson<string | null>(TOKEN_STORAGE_KEY, null);

/**
 * Saves the token of the session.
 *
 * @param token Token given by the API.
 */
export const setToken = (token: string) => writeJson(TOKEN_STORAGE_KEY, token);

/**
 * Forgets the token of the session.
 */
export const clearToken = () => removeJson(TOKEN_STORAGE_KEY);
