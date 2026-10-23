import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("links every step but the last", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("link", { name: "Cart" })).not.toBeInTheDocument();
  });

  it("marks the last step as the current page", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />);
    expect(screen.getByText("Cart")).toHaveAttribute("aria-current", "page");
  });
});
