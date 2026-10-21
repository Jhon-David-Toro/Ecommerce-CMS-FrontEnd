import { describe, expect, it } from "vitest";

import { buildStars } from "./Rating.utils";

describe("buildStars", () => {
  it("returns five stars for any rating", () => {
    [0, 1.2, 3.5, 4.9, 5].forEach((rating) => expect(buildStars(rating)).toHaveLength(5));
  });

  it("adds one half star from .5 upwards", () => {
    expect(buildStars(3.5)).toEqual(["full", "full", "full", "half", "empty"]);
    expect(buildStars(3.4)).toEqual(["full", "full", "full", "empty", "empty"]);
  });

  it("has no empty stars for a perfect rating", () => {
    expect(buildStars(5)).toEqual(["full", "full", "full", "full", "full"]);
  });
});
