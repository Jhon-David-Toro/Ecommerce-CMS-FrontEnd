import { writeJson } from "@/lib/shared/storage/storage";

import type { Entity, Repository } from "./repository.types";
import { deleteRecord, findRecord, insertRecord, patchRecord, readCollection } from "./repository.utils";

export { nextId } from "./repository.utils";

/**
 * Creates a CRUD repository that keeps its records in browser storage, as a stand-in for a REST API.
 * Every operation is asynchronous so the screens already handle loading, like with a real backend.
 *
 * @param key Storage key of the collection.
 * @param seed Builds the initial records the first time the collection is read.
 * @returns The repository.
 */
export const createRepository = <T extends Entity>(key: string, seed: () => T[]): Repository<T> => {
  const read = () => readCollection(key, seed);

  return {
    list: async () => read(),
    getById: async (id) => findRecord(read(), id),
    create: async (data) => insertRecord(key, read(), data),
    update: async (id, patch) => patchRecord(key, read(), id, patch),
    remove: async (id) => deleteRecord(key, read(), id),
    save: async (items) => writeJson(key, items),
  };
};
