import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import categories from "@/assets/home-category.json";
import { HomeCategory } from "./HomeCategory";

describe("HomeCategory", () => {
  it("renders one link per category", () => {
    render(<HomeCategory />);
    expect(screen.getAllByRole("link")).toHaveLength(categories.length);
  });

  it("shows each category title and image", () => {
    render(<HomeCategory />);
    categories.forEach(({ title }) => {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: `Clothes ${title}` })).toBeInTheDocument();
    });
  });
});
