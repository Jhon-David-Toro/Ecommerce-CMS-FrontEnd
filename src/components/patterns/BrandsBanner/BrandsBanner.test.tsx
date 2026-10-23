import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { listBrands } from "@/lib/taxonomy/taxonomy.api";

import { BrandsBanner } from "./BrandsBanner";

vi.mock("@/lib/taxonomy/taxonomy.api", () => ({ listBrands: vi.fn() }));

const brand = (id: number, name: string, logo: string, visible = true) => ({ id, name, slug: name.toLowerCase(), logo, visible });

describe("BrandsBanner", () => {
  beforeEach(() => {
    vi.mocked(listBrands).mockResolvedValue([
      brand(1, "Zara", "https://res.cloudinary.com/x/zara.svg"),
      brand(2, "Gucci", "https://res.cloudinary.com/x/gucci.svg"),
      brand(3, "Hidden", "https://res.cloudinary.com/x/hidden.svg", false),
      brand(4, "No logo", ""),
    ]);
  });

  it("shows one logo per visible brand that has a logo, named after the brand", async () => {
    render(<BrandsBanner />);
    expect(await screen.findByRole("img", { name: "Zara" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Gucci" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("stays hidden when no brand has a logo", async () => {
    vi.mocked(listBrands).mockResolvedValue([brand(1, "Plain", "")]);
    const { container } = render(<BrandsBanner />);
    await vi.waitFor(() => expect(listBrands).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });
});
