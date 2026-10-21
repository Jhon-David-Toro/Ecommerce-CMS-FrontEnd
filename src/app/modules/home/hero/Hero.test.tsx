import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Hero from "./Hero";

describe("Hero", () => {
  it("shows the headline and the call to action", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /find clothes that matches your style/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop Now" })).toHaveAttribute("href", "/products");
  });

  it("lists the three store stats", () => {
    render(<Hero />);
    expect(screen.getByText("International Brands")).toBeInTheDocument();
    expect(screen.getByText("High-Quality Products")).toBeInTheDocument();
    expect(screen.getByText("Happy Customers")).toBeInTheDocument();
  });

  it("shows the desktop and mobile hero images", () => {
    render(<Hero />);
    expect(screen.getAllByRole("img", { name: "Fashion collection" })).toHaveLength(2);
  });
});
