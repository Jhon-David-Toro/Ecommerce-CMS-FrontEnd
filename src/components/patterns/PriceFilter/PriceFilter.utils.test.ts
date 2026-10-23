import { describe, expect, it } from "vitest";

import { getPriceGap, movePriceBound } from "./PriceFilter.utils";

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

describe("getPriceGap", () => {
  it("keeps the usual gap on a wide range and shrinks it on a narrow one", () => {
    expect(getPriceGap([0, 250])).toBe(10);
    expect(getPriceGap([20, 30])).toBe(2);
    expect(getPriceGap([20, 22])).toBe(1);
  });

  it("lets the ends get closer on a narrow range", () => {
    expect(movePriceBound([20, 30], "min", 28, 2)).toEqual([28, 30]);
    expect(movePriceBound([20, 30], "min", 29, 2)).toBeNull();
  });
});
