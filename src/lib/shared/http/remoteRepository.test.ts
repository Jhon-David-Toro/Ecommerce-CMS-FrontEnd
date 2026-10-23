import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Entity } from "@/lib/mock/repository.types";

import { createRemoteRepository } from "./remoteRepository";

interface Fruit extends Entity {
  name: string;
  color: string;
}

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("createRemoteRepository", () => {
  const fetchMock = vi.fn();
  const repository = createRemoteRepository<Fruit>({ listPath: () => "/api/public/fruits", itemPath: "/api/admin/fruits" });

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("lists from the path that applies at that moment", async () => {
    fetchMock.mockResolvedValue(answer(200, [{ id: 1, name: "apple", color: "red" }]));
    expect(await repository.list()).toHaveLength(1);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/fruits");
  });

  it("answers null for a record that does not exist", async () => {
    fetchMock.mockResolvedValue(answer(404, { code: "NOT_FOUND", message: "no" }));
    expect(await repository.getById(9)).toBeNull();
  });

  it("rethrows other failures when reading one record", async () => {
    fetchMock.mockResolvedValue(answer(500, { code: "X", message: "boom" }));
    await expect(repository.getById(1)).rejects.toMatchObject({ status: 500 });
  });

  it("creates with POST", async () => {
    fetchMock.mockResolvedValue(answer(201, { id: 3, name: "plum", color: "purple" }));
    await repository.create({ name: "plum", color: "purple" });
    expect(fetchMock).toHaveBeenCalledWith("/api/admin/fruits", expect.objectContaining({ method: "POST" }));
  });

  it("updates by merging the patch over the current record and sending it with PUT", async () => {
    fetchMock
      .mockResolvedValueOnce(answer(200, { id: 1, name: "apple", color: "red" }))
      .mockResolvedValueOnce(answer(200, { id: 1, name: "apple", color: "green" }));
    await repository.update(1, { color: "green" });
    expect(fetchMock.mock.calls[1][0]).toBe("/api/admin/fruits/1");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({ id: 1, name: "apple", color: "green" });
  });

  it("removes with DELETE and does not support saving a whole collection", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
    await repository.remove(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/admin/fruits/1", expect.objectContaining({ method: "DELETE" }));
    await expect(repository.save([])).rejects.toThrow("not available");
  });
});
