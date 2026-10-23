import { describe, expect, it } from "vitest";

import { slugify, toLines, toParagraphs } from "./text";

describe("slugify", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(slugify("Loose Fit Bermuda Shorts")).toBe("loose-fit-bermuda-shorts");
  });

  it("removes accents and symbols", () => {
    expect(slugify("  Camiseta Básica! (2024) ")).toBe("camiseta-basica-2024");
  });
});

describe("toLines", () => {
  it("trims lines and drops the empty ones", () => {
    expect(toLines(" a \n\n b\n   ")).toEqual(["a", "b"]);
  });
});

describe("toParagraphs", () => {
  it("splits on blank lines and trims", () => {
    expect(toParagraphs(" one \n\n two\nstill two \n\n\n")).toEqual(["one", "two\nstill two"]);
  });
});
