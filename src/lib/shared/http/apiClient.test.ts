import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "./ApiError";
import { apiRequest, buildHeaders } from "./apiClient";
import { clearToken, getToken, setToken } from "./token";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("apiRequest", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("sends JSON and returns the parsed answer", async () => {
    fetchMock.mockResolvedValue(answer(200, { id: 1 }));
    const result = await apiRequest<{ id: number }>("/api/things", { method: "POST", body: { name: "x" } });
    expect(result).toEqual({ id: 1 });
    expect(fetchMock).toHaveBeenCalledWith("/api/things", expect.objectContaining({ method: "POST", body: '{"name":"x"}' }));
  });

  it("adds the token of the session", () => {
    expect(buildHeaders()).not.toHaveProperty("Authorization");
    setToken("abc");
    expect(buildHeaders()).toHaveProperty("Authorization", "Bearer abc");
    clearToken();
    expect(getToken()).toBeNull();
  });

  it("returns undefined when there is no content", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
    await expect(apiRequest<void>("/api/things/1", { method: "DELETE" })).resolves.toBeUndefined();
  });

  it("throws an ApiError with the message of the API", async () => {
    fetchMock.mockResolvedValue(answer(409, { code: "AUTH_EMAIL_TAKEN", message: "That email is already registered." }));
    const error = await apiRequest("/api/auth/register").catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 409, code: "AUTH_EMAIL_TAKEN", message: "That email is already registered." });
  });

  it("falls back to a generic message when the answer has no body", async () => {
    fetchMock.mockResolvedValue(new Response("oops", { status: 500 }));
    await expect(apiRequest("/api/x")).rejects.toMatchObject({ status: 500, code: "UNKNOWN" });
  });
});
