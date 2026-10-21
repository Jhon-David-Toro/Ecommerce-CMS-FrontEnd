import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePagination } from "./usePagination";

const items = Array.from({ length: 10 }, (_, index) => index + 1);

describe("usePagination", () => {
  it("starts on the first page", () => {
    const { result } = renderHook(() => usePagination(items, 4));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.pageItems).toEqual([1, 2, 3, 4]);
  });

  it("goes back to the first page when the list changes", () => {
    const { result, rerender } = renderHook(({ list }) => usePagination(list, 4), { initialProps: { list: items } });
    act(() => result.current.setCurrentPage(3));
    rerender({ list: items.slice(0, 6) });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageItems).toEqual([1, 2, 3, 4]);
  });

  it("returns the items of the chosen page", () => {
    const { result } = renderHook(() => usePagination(items, 4));
    act(() => result.current.setCurrentPage(3));
    expect(result.current.pageItems).toEqual([9, 10]);
  });
});
