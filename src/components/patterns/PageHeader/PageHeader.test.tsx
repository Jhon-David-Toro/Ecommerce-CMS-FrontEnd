import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("shows the title", () => {
    render(<PageHeader title="Products" />);
    expect(screen.getByRole("heading", { level: 1, name: "Products" })).toBeInTheDocument();
  });

  it("shows the description and the actions when given", () => {
    render(<PageHeader title="Products" description="Manage the catalog" actions={<button>New product</button>} />);
    expect(screen.getByText("Manage the catalog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New product" })).toBeInTheDocument();
  });
});
