import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getItemsPerSlide, getNextSlide, getPreviousSlide } from "./HappyCustomers.utils";
import { useSlider } from "./hooks/useSlider";

describe("getItemsPerSlide", () => {
  it.each([
    [500, 1],
    [800, 2],
    [1440, 3],
  ])("shows %i px wide windows with %i review(s)", (width, expected) => {
    expect(getItemsPerSlide(width)).toBe(expected);
  });
});

describe("slide movement", () => {
  it("wraps forward after the last slide", () => {
    expect(getNextSlide(0, 1)).toBe(1);
    expect(getNextSlide(1, 1)).toBe(0);
  });

  it("wraps backward before the first slide", () => {
    expect(getPreviousSlide(1, 1)).toBe(0);
    expect(getPreviousSlide(0, 1)).toBe(1);
  });
});

describe("useSlider", () => {
  it("is static when everything fits", () => {
    const { result } = renderHook(() => useSlider({ total: 3, itemsPerSlide: 3 }));
    expect(result.current.isStatic).toBe(true);
  });

  it("moves forward and backward with wrapping", () => {
    const { result } = renderHook(() => useSlider({ total: 4, itemsPerSlide: 3 }));
    act(() => result.current.next());
    expect(result.current.currentSlide).toBe(1);
    act(() => result.current.next());
    expect(result.current.currentSlide).toBe(0);
    act(() => result.current.previous());
    expect(result.current.currentSlide).toBe(1);
  });
});
