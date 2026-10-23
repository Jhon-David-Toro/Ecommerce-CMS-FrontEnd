import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotFoundPage } from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("explains the problem and offers two ways back", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to the store" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });
});
