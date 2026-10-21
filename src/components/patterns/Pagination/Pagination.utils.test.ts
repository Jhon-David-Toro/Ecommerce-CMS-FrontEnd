import { describe, expect, it, vi } from "vitest";

import { generatePageElements, getPageRange, goToNextPage, goToPreviousPage } from "./Pagination.utils";

const labels = (currentPage: number, totalPages: number, isMobile = false) =>
  generatePageElements({ currentPage, totalPages, onPageChange: vi.fn(), isMobile }).map((element) => element.content);

describe("generatePageElements", () => {
  it("lists every page when they all fit", () => {
    expect(labels(1, 4)).toEqual([1, 2, 3, 4]);
  });

  it("collapses the end behind an ellipsis", () => {
    expect(labels(1, 10)).toEqual([1, 2, 3, 4, 5, "...", 10]);
  });

  it("collapses both sides around a middle page", () => {
    expect(labels(5, 10)).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 10]);
  });

  it("collapses the start near the last page", () => {
    expect(labels(10, 10)).toEqual([1, "...", 8, 9, 10]);
  });

  it("shows fewer pages on mobile", () => {
    expect(labels(5, 10, true)).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });

  it("marks the current page as active and points buttons to their page", () => {
    const onPageChange = vi.fn();
    const elements = generatePageElements({ currentPage: 2, totalPages: 3, onPageChange });
    expect(elements.map((element) => element.isActive)).toEqual([false, true, false]);
    elements[2].onClick?.();
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});

describe("getPageRange", () => {
  it("never starts before page 1 or ends after the last page", () => {
    expect(getPageRange(1, 10)).toEqual({ startPage: 1, endPage: 5 });
    expect(getPageRange(10, 10)).toEqual({ startPage: 8, endPage: 10 });
  });
});

describe("page navigation", () => {
  it("goes back unless on the first page", () => {
    const onPageChange = vi.fn();
    goToPreviousPage(1, onPageChange);
    goToPreviousPage(3, onPageChange);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("goes forward unless on the last page", () => {
    const onPageChange = vi.fn();
    goToNextPage(5, 5, onPageChange);
    goToNextPage(2, 5, onPageChange);
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
