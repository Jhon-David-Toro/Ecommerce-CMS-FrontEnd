import { beforeEach, describe, expect, it } from "vitest";

import { removeJson } from "@/lib/shared/storage/storage";

import { createRepository, nextId } from "./repository";
import type { Entity } from "./repository.types";

interface Fruit extends Entity {
  name: string;
}

const KEY = "test.fruits";
const seed = (): Fruit[] => [
  { id: 1, name: "apple" },
  { id: 2, name: "pear" },
];

describe("nextId", () => {
  it("is one above the highest id", () => {
    expect(nextId([{ id: 3 }, { id: 9 }, { id: 4 }])).toBe(10);
  });

  it("starts at 1 for an empty list", () => {
    expect(nextId([])).toBe(1);
  });
});

describe("createRepository", () => {
  beforeEach(() => {
    window.localStorage.clear();
    removeJson(KEY);
  });

  it("seeds the collection on first read", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    expect(await repo.list()).toEqual(seed());
  });

  it("finds a record by id", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    expect(await repo.getById(2)).toEqual({ id: 2, name: "pear" });
    expect(await repo.getById(99)).toBeNull();
  });

  it("creates a record with a new id", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    const created = await repo.create({ name: "plum" });
    expect(created).toEqual({ id: 3, name: "plum" });
    expect(await repo.list()).toHaveLength(3);
  });

  it("updates only the given fields", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    await repo.update(1, { name: "green apple" });
    expect(await repo.getById(1)).toEqual({ id: 1, name: "green apple" });
  });

  it("rejects an update of a missing record", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    await expect(repo.update(99, { name: "x" })).rejects.toThrow("Record not found");
  });

  it("removes a record", async () => {
    const repo = createRepository<Fruit>(KEY, seed);
    await repo.remove(1);
    expect((await repo.list()).map((fruit) => fruit.id)).toEqual([2]);
  });

  it("keeps the data between repository instances", async () => {
    await createRepository<Fruit>(KEY, seed).create({ name: "plum" });
    expect(await createRepository<Fruit>(KEY, seed).list()).toHaveLength(3);
  });
});
