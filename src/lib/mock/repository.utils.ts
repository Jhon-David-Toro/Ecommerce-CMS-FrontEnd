import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { NOT_FOUND_MESSAGE } from "./repository.constants";
import type { Entity, NewEntity } from "./repository.types";

/**
 * Computes the id for a new record: one more than the highest existing id.
 *
 * @param items Existing records.
 * @returns The next free id.
 */
export const nextId = (items: Entity[]) => items.reduce((highest, item) => Math.max(highest, item.id), 0) + 1;

/**
 * Reads a whole collection from storage, seeding it on first use.
 *
 * @param key Storage key of the collection.
 * @param seed Builds the initial records.
 * @returns The stored records.
 */
export const readCollection = <T extends Entity>(key: string, seed: () => T[]) => {
  const stored = readJson<T[] | null>(key, null);
  if (stored) return stored;
  const initial = seed();
  writeJson(key, initial);
  return initial;
};

/**
 * Builds a new record with the next free id.
 *
 * @param items Existing records.
 * @param data Data of the new record.
 * @returns The new record.
 */
export const buildRecord = <T extends Entity>(items: T[], data: NewEntity<T>) => ({ ...data, id: nextId(items) }) as T;

/**
 * Applies a patch to one record of a collection.
 *
 * @param items Existing records.
 * @param id Id of the record to change.
 * @param patch Fields to change.
 * @returns The whole collection and the changed record.
 * @throws When no record has that id.
 */
export const applyPatch = <T extends Entity>(items: T[], id: number, patch: Partial<NewEntity<T>>) => {
  const current = items.find((item) => item.id === id);
  if (!current) throw new Error(NOT_FOUND_MESSAGE);
  const updated = { ...current, ...patch };
  return { items: items.map((item) => (item.id === id ? updated : item)), updated };
};

/**
 * Finds a record by id.
 *
 * @param items Existing records.
 * @param id Id to look for.
 * @returns The record, or null when there is none with that id.
 */
export const findRecord = <T extends Entity>(items: T[], id: number) => items.find((item) => item.id === id) ?? null;

/**
 * Adds a record to a stored collection.
 *
 * @param key Storage key of the collection.
 * @param items Existing records.
 * @param data Data of the new record.
 * @returns The new record.
 */
export const insertRecord = <T extends Entity>(key: string, items: T[], data: NewEntity<T>) => {
  const created = buildRecord(items, data);
  writeJson(key, [...items, created]);
  return created;
};

/**
 * Changes a record of a stored collection.
 *
 * @param key Storage key of the collection.
 * @param items Existing records.
 * @param id Id of the record to change.
 * @param patch Fields to change.
 * @returns The changed record.
 */
export const patchRecord = <T extends Entity>(key: string, items: T[], id: number, patch: Partial<NewEntity<T>>) => {
  const result = applyPatch(items, id, patch);
  writeJson(key, result.items);
  return result.updated;
};

/**
 * Removes a record from a stored collection.
 *
 * @param key Storage key of the collection.
 * @param items Existing records.
 * @param id Id of the record to remove.
 */
export const deleteRecord = <T extends Entity>(key: string, items: T[], id: number) =>
  writeJson(
    key,
    items.filter((item) => item.id !== id),
  );
