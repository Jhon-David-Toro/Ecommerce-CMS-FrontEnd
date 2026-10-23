import { beforeEach, describe, expect, it } from "vitest";

import { readJson, removeJson, writeJson } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    removeJson("sample");
  });

  it("returns the fallback when nothing is stored", () => {
    expect(readJson("sample", { a: 1 })).toEqual({ a: 1 });
  });

  it("round-trips a value", () => {
    writeJson("sample", { a: 2 });
    expect(readJson("sample", null)).toEqual({ a: 2 });
  });

  it("returns the fallback when the stored text is not valid JSON", () => {
    window.localStorage.setItem("shop.sample", "{oops");
    expect(readJson("sample", "fallback")).toBe("fallback");
  });

  it("removes a value", () => {
    writeJson("sample", 1);
    removeJson("sample");
    expect(readJson("sample", 0)).toBe(0);
  });
});
