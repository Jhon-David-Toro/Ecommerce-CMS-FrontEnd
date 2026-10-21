import { describe, expect, it } from "vitest";

import { cx } from "./cx";

describe("cx", () => {
  it("joins plain class names", () => {
    expect(cx("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cx("a", false, null, undefined, "")).toBe("a");
  });

  it("keeps only the enabled entries of a record", () => {
    expect(cx("a", { b: true, c: false, d: undefined })).toBe("a b");
  });

  it("returns an empty string without values", () => {
    expect(cx()).toBe("");
  });
});
