import type { Entity } from "@/lib/mock/repository.types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: unknown;
}

export interface ApiErrorBody {
  code?: string;
  message?: string;
}

export interface RemoteRepositoryOptions {
  listPath: () => string;
  itemPath: string;
}

export type RemoteEntity = Entity;
