import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("shows the title", () => {
    render(<EmptyState title="Nothing here" />);
    expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
  });

  it("shows the description and the action when given", () => {
    render(<EmptyState title="Empty" description="Add something" action={<button>Add</button>} />);
    expect(screen.getByText("Add something")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
});
