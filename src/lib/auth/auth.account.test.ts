import { beforeEach, describe, expect, it } from "vitest";

import { changePassword, login, updateProfile } from "./auth.api";

describe("account changes", () => {
  beforeEach(() => window.localStorage.clear());

  it("changes the name and email of a user", async () => {
    const user = await updateProfile(2, { name: " New Name ", email: "NEW@shop.test" });
    expect(user).toMatchObject({ name: "New Name", email: "new@shop.test" });
    expect((await login({ email: "new@shop.test", password: "customer123" })).id).toBe(2);
  });

  it("refuses an email that another account uses", async () => {
    await expect(updateProfile(2, { name: "A", email: "admin@shop.test" })).rejects.toThrow("already exists");
  });

  it("changes the password only with the right current one", async () => {
    await expect(changePassword(2, "wrong", "newpass1")).rejects.toThrow("not correct");
    await expect(changePassword(2, "customer123", "123")).rejects.toThrow("at least 6");
    await changePassword(2, "customer123", "newpass1");
    expect((await login({ email: "customer@shop.test", password: "newpass1" })).id).toBe(2);
  });
});
