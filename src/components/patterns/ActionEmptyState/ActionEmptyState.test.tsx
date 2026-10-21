import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActionEmptyState } from "./ActionEmptyState";

describe("ActionEmptyState", () => {
  it("shows the message and a link to somewhere useful", () => {
    render(<ActionEmptyState title="Nothing here" description="Try later." actionLabel="Go shopping" actionHref="/products" />);
    expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
    expect(screen.getByText("Try later.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go shopping" })).toHaveAttribute("href", "/products");
  });
});
