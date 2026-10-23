import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TableToolbar } from "./TableToolbar";

describe("TableToolbar", () => {
  it("shows the search text", () => {
    render(<TableToolbar query="shirt" onQueryChange={vi.fn()} placeholder="Search products" />);
    expect(screen.getByRole("searchbox", { name: "Search products" })).toHaveValue("shirt");
  });

  it("reports what is typed", async () => {
    const onQueryChange = vi.fn();
    render(<TableToolbar query="" onQueryChange={onQueryChange} />);
    await userEvent.type(screen.getByRole("searchbox"), "ab");
    expect(onQueryChange).toHaveBeenLastCalledWith("b");
  });

  it("shows the extra filters", () => {
    render(
      <TableToolbar query="" onQueryChange={vi.fn()}>
        <select aria-label="Status" />
      </TableToolbar>,
    );
    expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
  });
});
