import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { NOT_FOUND_MESSAGE } from "./repository.constants";
import type { Entity, NewEntity, Repository } from "./repository.types";

/**
 * Computes the id for a new record: one more than the highest existing id.
 *
 * @param items Existing records.
 * @returns The next free id.
 */
export const nextId = (items: Entity[]) => items.reduce((highest, item) => Math.max(highest, item.id), 0) + 1;

/**
 * Creates a CRUD repository that keeps its records in browser storage, as a stand-in for a REST API.
 * Every operation is asynchronous so the screens already handle loading, like with a real backend.
 *
 * @param key Storage key of the collection.
 * @param seed Builds the initial records the first time the collection is read.
 * @returns The repository.
 */
export const createRepository = <T extends Entity>(key: string, seed: () => T[]): Repository<T> => {
  /**
   * Reads the whole collection, seeding it on first use.
   *
   * @returns The stored records.
   */
  const read = () => {
    const stored = readJson<T[] | null>(key, null);
    if (stored) return stored;
    const initial = seed();
    writeJson(key, initial);
    return initial;
  };

  return {
    list: async () => read(),
    getById: async (id) => read().find((item) => item.id === id) ?? null,
    create: async (data: NewEntity<T>) => {
      const items = read();
      const created = { ...data, id: nextId(items) } as T;
      writeJson(key, [...items, created]);
      return created;
    },
    update: async (id, patch) => {
      const items = read();
      const current = items.find((item) => item.id === id);
      if (!current) throw new Error(NOT_FOUND_MESSAGE);
      const updated = { ...current, ...patch };
      writeJson(
        key,
        items.map((item) => (item.id === id ? updated : item)),
      );
      return updated;
    },
    remove: async (id) =>
      writeJson(
        key,
        read().filter((item) => item.id !== id),
      ),
    save: async (items) => writeJson(key, items),
  };
};
