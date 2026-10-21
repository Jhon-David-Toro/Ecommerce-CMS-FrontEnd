import { describe, expect, it } from "vitest";

import { movePriceBound } from "./PriceFilter.utils";

describe("movePriceBound", () => {
  it("moves the minimum while keeping the gap", () => {
    expect(movePriceBound([50, 200], "min", 100)).toEqual([100, 200]);
    expect(movePriceBound([50, 200], "min", 190)).toEqual([190, 200]);
  });

  it("rejects a minimum that gets too close to the maximum", () => {
    expect(movePriceBound([50, 200], "min", 195)).toBeNull();
  });

  it("moves the maximum while keeping the gap", () => {
    expect(movePriceBound([50, 200], "max", 120)).toEqual([50, 120]);
  });

  it("rejects a maximum that gets too close to the minimum", () => {
    expect(movePriceBound([50, 200], "max", 55)).toBeNull();
  });
});
