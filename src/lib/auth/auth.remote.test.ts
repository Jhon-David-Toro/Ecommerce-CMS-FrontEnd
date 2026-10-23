import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getToken, setToken } from "@/lib/shared/http/token";

import { changePassword, getCurrentUser, login, logout, register, updateProfile, updateUser } from "./auth.remote";
import type { PublicUser } from "./auth.types";

const user: PublicUser = { id: 1, name: "Ana", email: "ana@shop.test", role: "customer", blocked: false, createdAt: 1 };

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("auth against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it("keeps the token after signing in and forgets it when signing out", async () => {
    fetchMock.mockResolvedValue(answer(200, { token: "t1", user }));
    expect(await login({ email: user.email, password: "secret1" })).toEqual(user);
    expect(getToken()).toBe("t1");
    await logout();
    expect(getToken()).toBeNull();
  });

  it("registers and signs in", async () => {
    fetchMock.mockResolvedValue(answer(201, { token: "t2", user }));
    await register({ name: "Ana", email: user.email, password: "secret1" });
    expect(getToken()).toBe("t2");
    expect(fetchMock.mock.calls[0][0]).toBe("/api/auth/register");
  });

  it("has no current user without a token and does not call the API", async () => {
    expect(await getCurrentUser()).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reads the current user with the token", async () => {
    setToken("t3");
    fetchMock.mockResolvedValue(answer(200, user));
    expect(await getCurrentUser()).toEqual(user);
  });

  it("ends the session when the token is rejected", async () => {
    setToken("old");
    fetchMock.mockResolvedValue(answer(401));
    expect(await getCurrentUser()).toBeNull();
    expect(getToken()).toBeNull();
  });

  it("keeps the token when the API cannot be reached", async () => {
    setToken("keep");
    fetchMock.mockRejectedValue(new TypeError("network"));
    expect(await getCurrentUser()).toBeNull();
    expect(getToken()).toBe("keep");
  });

  it("updates the profile, the password and the blocked flag", async () => {
    fetchMock
      .mockResolvedValueOnce(answer(200, user))
      .mockResolvedValueOnce(answer(204))
      .mockResolvedValueOnce(answer(200, { ...user, blocked: true }));
    await updateProfile(1, { name: "Ana", email: user.email });
    await changePassword(1, "secret1", "secret2");
    expect((await updateUser(1, { blocked: true })).blocked).toBe(true);
    expect(fetchMock.mock.calls.map(([path]) => path)).toEqual(["/api/auth/profile", "/api/auth/password", "/api/admin/users/1/blocked"]);
  });
});
