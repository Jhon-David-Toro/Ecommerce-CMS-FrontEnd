import type { Entity, NewEntity, Repository } from "@/lib/mock/repository.types";

import { ApiError } from "./ApiError";
import { HTTP_STATUS, UNSUPPORTED_MESSAGE } from "./api.constants";
import type { RemoteRepositoryOptions } from "./api.types";
import { apiRequest } from "./apiClient";

/**
 * Answers null when a record does not exist and rethrows any other failure.
 *
 * @param error Reason the request failed.
 * @returns Null for a 404.
 * @throws The error when it is not a 404.
 */
export const nullWhenMissing = (error: unknown) => {
  if (error instanceof ApiError && error.status === HTTP_STATUS.notFound) return null;
  throw error;
};

/**
 * Creates a repository that reads and writes its records through the REST API, with the same shape as the browser one.
 *
 * @param options Paths of the API.
 * @param options.listPath Gives the path that lists the records; it can depend on who is signed in.
 * @param options.itemPath Path of the collection, used to create, read, update and delete one record.
 * @returns The repository.
 */
export const createRemoteRepository = <T extends Entity>({ listPath, itemPath }: RemoteRepositoryOptions): Repository<T> => ({
  list: () => apiRequest<T[]>(listPath()),
  getById: (id) => apiRequest<T>(`${itemPath}/${id}`).catch(nullWhenMissing),
  create: (data: NewEntity<T>) => apiRequest<T>(itemPath, { method: "POST", body: data }),
  update: async (id, patch) => {
    const current = await apiRequest<T>(`${itemPath}/${id}`);
    return apiRequest<T>(`${itemPath}/${id}`, { method: "PUT", body: { ...current, ...patch } });
  },
  remove: (id) => apiRequest<void>(`${itemPath}/${id}`, { method: "DELETE" }),
  save: async () => {
    throw new Error(UNSUPPORTED_MESSAGE);
  },
});
