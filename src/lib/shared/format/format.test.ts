import { describe, expect, it } from "vitest";

import { formatDate, formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats dollars with two decimals", () => {
    expect(formatPrice(260)).toBe("$260.00");
  });

  it("supports another currency", () => {
    expect(formatPrice(10, "EUR")).toContain("10.00");
  });
});

describe("formatDate", () => {
  it("writes the month in words", () => {
    expect(formatDate("2023-08-14T12:00:00.000Z")).toBe("August 14, 2023");
  });

  it("keeps text that is not a date", () => {
    expect(formatDate("soon")).toBe("soon");
  });
});
