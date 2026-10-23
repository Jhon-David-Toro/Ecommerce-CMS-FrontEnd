import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Brands } from "./Brands";
import { getBrandHref } from "./Brands.utils";

describe("Brands", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the brands as links to their products", async () => {
    render(<Brands />);
    expect(await screen.findByRole("link", { name: "Zara" })).toHaveAttribute("href", "/products?brand=Zara");
  });

  it("builds the address of a brand", () => {
    expect(getBrandHref({ id: 1, name: "Calvin Klein", slug: "ck", logo: "", visible: true })).toBe("/products?brand=Calvin%20Klein");
  });
});
