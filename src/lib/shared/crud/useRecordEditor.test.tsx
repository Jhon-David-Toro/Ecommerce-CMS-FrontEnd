import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createRepository } from "@/lib/mock/repository";

import { useRecordEditor } from "./useRecordEditor";

interface Note {
  id: number;
  text: string;
}

const seed = (): Note[] => [{ id: 1, text: "first" }];

describe("useRecordEditor", () => {
  beforeEach(() => window.localStorage.clear());

  /**
   * Renders the hook over a fresh repository.
   *
   * @returns The hook result, the repository and the reload spy.
   */
  const setup = () => {
    const repository = createRepository<Note>("notes", seed);
    const reload = vi.fn();
    const hook = renderHook(() => useRecordEditor({ repository, toInput: (text: string) => ({ text }), reload }));
    return { repository, reload, hook };
  };

  it("creates a record", async () => {
    const { repository, reload, hook } = setup();
    act(() => hook.result.current.startNew());
    await act(() => hook.result.current.save("second"));
    expect((await repository.list()).map((note) => note.text)).toEqual(["first", "second"]);
    expect(hook.result.current.editing).toBeNull();
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("updates the record being edited", async () => {
    const { repository, hook } = setup();
    act(() => hook.result.current.startEdit({ id: 1, text: "first" }));
    await act(() => hook.result.current.save("changed"));
    expect((await repository.getById(1))?.text).toBe("changed");
  });

  it("cancels editing", () => {
    const { hook } = setup();
    act(() => hook.result.current.startNew());
    expect(hook.result.current.editing).toBe("new");
    act(() => hook.result.current.cancelEdit());
    expect(hook.result.current.editing).toBeNull();
  });

  it("deletes only after being asked", async () => {
    const { repository, reload, hook } = setup();
    act(() => hook.result.current.askDelete({ id: 1, text: "first" }));
    expect(hook.result.current.toDelete?.id).toBe(1);
    await act(() => hook.result.current.confirmDelete());
    expect(await repository.list()).toEqual([]);
    expect(hook.result.current.toDelete).toBeNull();
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("keeps the record when the deletion is cancelled", async () => {
    const { repository, hook } = setup();
    act(() => hook.result.current.askDelete({ id: 1, text: "first" }));
    act(() => hook.result.current.cancelDelete());
    expect(await repository.list()).toHaveLength(1);
  });
});
