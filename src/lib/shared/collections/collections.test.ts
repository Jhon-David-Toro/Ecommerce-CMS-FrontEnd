import { describe, expect, it } from "vitest";

import { range, toggleItem } from "./collections";

describe("toggleItem", () => {
  it("adds a missing item", () => {
    expect(toggleItem(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes an existing item", () => {
    expect(toggleItem(["a", "b"], "a")).toEqual(["b"]);
  });

  it("does not change the original list", () => {
    const items = ["a"];
    toggleItem(items, "b");
    expect(items).toEqual(["a"]);
  });
});

describe("range", () => {
  it("includes both ends", () => {
    expect(range(2, 5)).toEqual([2, 3, 4, 5]);
  });

  it("is empty when the end is below the start", () => {
    expect(range(3, 1)).toEqual([]);
  });
});
