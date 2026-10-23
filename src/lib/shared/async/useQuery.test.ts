import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useQuery } from "./useQuery";

const double = async (value: number) => value * 2;

describe("useQuery", () => {
  it("starts loading and then returns the data", async () => {
    const { result } = renderHook(() => useQuery(double, 4));
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.data).toBe(8));
    expect(result.current.isLoading).toBe(false);
  });

  it("reports an error", async () => {
    const fail = async () => {
      throw new Error("boom");
    };
    const { result } = renderHook(() => useQuery(fail, undefined));
    await waitFor(() => expect(result.current.error?.message).toBe("boom"));
  });

  it("loads again when the argument changes by content", async () => {
    const load = vi.fn(async (args: { n: number }) => args.n);
    const { result, rerender } = renderHook(({ n }) => useQuery(load, { n }), { initialProps: { n: 1 } });
    await waitFor(() => expect(result.current.data).toBe(1));
    rerender({ n: 1 });
    expect(load).toHaveBeenCalledTimes(1);
    rerender({ n: 2 });
    await waitFor(() => expect(result.current.data).toBe(2));
  });

  it("loads again on reload", async () => {
    const load = vi.fn(async () => 1);
    const { result } = renderHook(() => useQuery(load, undefined));
    await waitFor(() => expect(result.current.data).toBe(1));
    act(() => result.current.reload());
    await waitFor(() => expect(load).toHaveBeenCalledTimes(2));
  });
});
