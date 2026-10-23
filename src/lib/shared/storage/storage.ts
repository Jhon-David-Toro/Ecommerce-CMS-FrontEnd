import { STORAGE_PREFIX } from "./storage.constants";

const memory = new Map<string, string>();

/**
 * Reads a raw value from localStorage, or from memory when localStorage is unavailable.
 *
 * @param key Storage key, without prefix.
 * @returns The stored text, or null when there is none.
 */
const readRaw = (key: string) => {
  try {
    return window.localStorage.getItem(STORAGE_PREFIX + key);
  } catch {
    return memory.get(key) ?? null;
  }
};

/**
 * Writes a raw value to localStorage, or to memory when localStorage is unavailable or full.
 *
 * @param key Storage key, without prefix.
 * @param value Text to store.
 */
const writeRaw = (key: string, value: string) => {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
  } catch {
    memory.set(key, value);
  }
};

/**
 * Reads a JSON value from browser storage.
 *
 * @param key Storage key, without prefix.
 * @param fallback Value returned when nothing valid is stored.
 * @returns The stored value, or `fallback`.
 */
export const readJson = <T>(key: string, fallback: T): T => {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

/**
 * Writes a JSON value to browser storage.
 *
 * @param key Storage key, without prefix.
 * @param value Value to store.
 */
export const writeJson = (key: string, value: unknown) => writeRaw(key, JSON.stringify(value));

/**
 * Removes a value from browser storage.
 *
 * @param key Storage key, without prefix.
 */
export const removeJson = (key: string) => {
  memory.delete(key);
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // nothing to clean when storage is unavailable
  }
};
