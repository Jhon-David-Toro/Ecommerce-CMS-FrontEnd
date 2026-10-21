import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useFetchJson } from "./useFetchJson";

describe("useFetchJson", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts empty and returns the parsed document", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ok: true }) }));
    const { result } = renderHook(() => useFetchJson<{ ok: boolean }>("/data/example.json"));
    expect(result.current).toBeNull();
    await waitFor(() => expect(result.current).toEqual({ ok: true }));
  });

  it("aborts the request when unmounted", () => {
    const fetchMock = vi.fn().mockReturnValue(new Promise(() => undefined));
    vi.stubGlobal("fetch", fetchMock);
    const { unmount } = renderHook(() => useFetchJson("/data/example.json"));
    const { signal } = fetchMock.mock.calls[0][1] as RequestInit;
    expect(signal?.aborted).toBe(false);
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
