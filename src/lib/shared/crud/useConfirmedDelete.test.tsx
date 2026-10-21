import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useConfirmedDelete } from "./useConfirmedDelete";

describe("useConfirmedDelete", () => {
  it("removes the record only after the admin confirms", async () => {
    const remove = vi.fn().mockResolvedValue(undefined);
    const reload = vi.fn();
    const { result } = renderHook(() => useConfirmedDelete<{ id: number }>({ remove, reload }));
    act(() => result.current.askDelete({ id: 4 }));
    expect(result.current.toDelete).toEqual({ id: 4 });
    expect(remove).not.toHaveBeenCalled();
    await act(() => result.current.confirmDelete());
    expect(remove).toHaveBeenCalledWith(4);
    expect(result.current.toDelete).toBeNull();
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("forgets the record when the admin cancels", () => {
    const remove = vi.fn();
    const { result } = renderHook(() => useConfirmedDelete<{ id: number }>({ remove, reload: vi.fn() }));
    act(() => result.current.askDelete({ id: 4 }));
    act(() => result.current.cancelDelete());
    expect(result.current.toDelete).toBeNull();
    expect(remove).not.toHaveBeenCalled();
  });
});
