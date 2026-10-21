import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import categories from "@/assets/home-category.json";
import HomeCategories from "./HomeCategories";

describe("HomeCategories", () => {
  it("shows the section title", () => {
    render(<HomeCategories />);
    expect(screen.getByRole("heading", { level: 2, name: /browse by dess style/i })).toBeInTheDocument();
  });

  it("lists every category", () => {
    render(<HomeCategories />);
    expect(screen.getAllByRole("link")).toHaveLength(categories.length);
  });
});
