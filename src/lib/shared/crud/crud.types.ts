import type { Entity, NewEntity, Repository } from "@/lib/mock/repository.types";

export type EditTarget<T> = T | "new" | null;

export interface RecordEditorOptions<T extends Entity, V> {
  repository: Repository<T>;
  toInput: (values: V) => NewEntity<T>;
  reload: () => void;
}
