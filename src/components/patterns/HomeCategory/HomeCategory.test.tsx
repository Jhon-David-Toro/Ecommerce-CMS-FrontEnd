import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeCategory } from "./HomeCategory";

const items = [
  { title: "Casual", image: "https://res.cloudinary.com/x/casual.svg", link: "/products?category=Casual" },
  { title: "Formal", image: "https://res.cloudinary.com/x/formal.svg", link: "/products?category=Formal", twoColumn: true },
];

describe("HomeCategory", () => {
  it("renders one link per category", () => {
    render(<HomeCategory items={items} />);
    expect(screen.getAllByRole("link")).toHaveLength(items.length);
    expect(screen.getByRole("link", { name: /formal/i })).toHaveAttribute("href", "/products?category=Formal");
  });

  it("shows each category title and image", () => {
    render(<HomeCategory items={items} />);
    items.forEach(({ title }) => {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: `Clothes ${title}` })).toBeInTheDocument();
    });
  });
});
