import { beforeEach, describe, expect, it } from "vitest";

import { getCurrentUser, listUsers, login, logout, register, updateUser } from "./auth.api";
import { useAuthStore } from "./authStore";

describe("auth api", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, isReady: false });
  });

  it("signs in a seeded account and remembers the session", async () => {
    const user = await login({ email: "admin@shop.test", password: "admin123" });
    expect(user).toMatchObject({ role: "admin", email: "admin@shop.test" });
    expect(user).not.toHaveProperty("password");
    expect((await getCurrentUser())?.id).toBe(user.id);
  });

  it("rejects wrong credentials", async () => {
    await expect(login({ email: "admin@shop.test", password: "nope" })).rejects.toThrow("Incorrect email or password.");
  });

  it("registers a customer and signs them in", async () => {
    const user = await register({ name: "Ana", email: "ANA@mail.test", password: "secret1" });
    expect(user).toMatchObject({ role: "customer", email: "ana@mail.test" });
    expect((await getCurrentUser())?.email).toBe("ana@mail.test");
  });

  it("refuses a duplicated email and a short password", async () => {
    await expect(register({ name: "X", email: "admin@shop.test", password: "secret1" })).rejects.toThrow("already exists");
    await expect(register({ name: "X", email: "new@mail.test", password: "123" })).rejects.toThrow("at least 6");
  });

  it("ends the session on logout", async () => {
    await login({ email: "admin@shop.test", password: "admin123" });
    await logout();
    expect(await getCurrentUser()).toBeNull();
  });

  it("blocks a user from signing in", async () => {
    const customer = (await listUsers()).find((user) => user.role === "customer");
    await updateUser(customer!.id, { blocked: true });
    await expect(login({ email: "customer@shop.test", password: "customer123" })).rejects.toThrow("blocked");
  });
});

describe("auth store", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAuthStore.setState({ user: null, isReady: false });
  });

  it("keeps the signed-in user and clears it on sign out", async () => {
    await useAuthStore.getState().signIn({ email: "customer@shop.test", password: "customer123" });
    expect(useAuthStore.getState().user?.role).toBe("customer");
    await useAuthStore.getState().signOut();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it("restores the session when hydrated", async () => {
    await login({ email: "admin@shop.test", password: "admin123" });
    await useAuthStore.getState().hydrate();
    expect(useAuthStore.getState()).toMatchObject({ isReady: true });
    expect(useAuthStore.getState().user?.email).toBe("admin@shop.test");
  });
});
