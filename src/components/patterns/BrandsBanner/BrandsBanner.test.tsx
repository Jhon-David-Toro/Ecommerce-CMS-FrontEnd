import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BRANDS } from "./BrandsBanner.constants";
import { BrandsBanner } from "./BrandsBanner";

describe("BrandsBanner", () => {
  it("shows one logo per brand", () => {
    render(<BrandsBanner />);
    expect(screen.getAllByRole("img")).toHaveLength(BRANDS.length);
  });

  it("names every logo after its brand", () => {
    render(<BrandsBanner />);
    BRANDS.forEach(({ name }) => expect(screen.getByRole("img", { name })).toBeInTheDocument());
  });
});
