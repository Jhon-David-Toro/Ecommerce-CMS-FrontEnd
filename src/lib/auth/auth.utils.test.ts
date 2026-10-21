import { describe, expect, it } from "vitest";

import type { PublicUser } from "./auth.types";
import { getPostLoginHref, getSafeNext } from "./auth.utils";

const user = (role: PublicUser["role"]): PublicUser => ({ id: 1, name: "A", email: "a@a.test", role, blocked: false, createdAt: 1 });

describe("getSafeNext", () => {
  it("keeps paths inside the site", () => {
    expect(getSafeNext("/cart")).toBe("/cart");
  });

  it("rejects missing, external and protocol-relative targets", () => {
    expect(getSafeNext(null)).toBeNull();
    expect(getSafeNext("https://evil.test")).toBeNull();
    expect(getSafeNext("//evil.test")).toBeNull();
  });
});

describe("getPostLoginHref", () => {
  it("returns to the requested page", () => {
    expect(getPostLoginHref(user("customer"), "/checkout")).toBe("/checkout");
  });

  it("falls back to the admin panel or the account", () => {
    expect(getPostLoginHref(user("admin"), null)).toBe("/admin");
    expect(getPostLoginHref(user("customer"), "//x")).toBe("/account");
  });
});
