export interface Entity {
  id: number;
}

export type NewEntity<T extends Entity> = Omit<T, "id">;

export interface Repository<T extends Entity> {
  list: () => Promise<T[]>;
  getById: (id: number) => Promise<T | null>;
  create: (data: NewEntity<T>) => Promise<T>;
  update: (id: number, patch: Partial<NewEntity<T>>) => Promise<T>;
  remove: (id: number) => Promise<void>;
  save: (items: T[]) => Promise<void>;
}
