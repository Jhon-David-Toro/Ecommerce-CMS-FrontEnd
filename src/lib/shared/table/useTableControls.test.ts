import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTableControls } from "./useTableControls";

const rows = Array.from({ length: 25 }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` }));
const options = { pageSize: 10, matches: (row: { name: string }, text: string) => row.name.toLowerCase().includes(text) };

describe("useTableControls", () => {
  it("starts on the first page", () => {
    const { result } = renderHook(() => useTableControls(rows, options));
    expect(result.current.pageRows).toHaveLength(10);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.total).toBe(25);
  });

  it("moves to another page", () => {
    const { result } = renderHook(() => useTableControls(rows, options));
    act(() => result.current.setPage(3));
    expect(result.current.pageRows.map((row) => row.id)).toEqual([21, 22, 23, 24, 25]);
  });

  it("filters by the search text and goes back to the first page", () => {
    const { result } = renderHook(() => useTableControls(rows, options));
    act(() => result.current.setPage(3));
    act(() => result.current.setQuery(" item 2 "));
    expect(result.current.page).toBe(1);
    expect(result.current.total).toBe(7);
  });

  it("keeps one page when nothing matches", () => {
    const { result } = renderHook(() => useTableControls(rows, options));
    act(() => result.current.setQuery("zzz"));
    expect(result.current).toMatchObject({ total: 0, totalPages: 1, pageRows: [] });
  });
});
