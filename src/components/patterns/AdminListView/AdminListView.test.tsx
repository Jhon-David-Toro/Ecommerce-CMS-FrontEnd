import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AdminListView } from "./AdminListView";
import type { ListControls, ListTable } from "./AdminListView.types";

interface Row {
  id: number;
  name: string;
}

const table: ListTable<Row> = {
  caption: "Things",
  emptyTitle: "No things",
  getRowKey: (row) => row.id,
  columns: [{ key: "name", header: "Name", render: (row) => row.name }],
};

/**
 * Builds list controls for a test.
 *
 * @param overrides Fields to change.
 * @returns The controls.
 */
const buildControls = (overrides: Partial<ListControls<Row>> = {}): ListControls<Row> => ({
  query: "",
  setQuery: vi.fn(),
  page: 1,
  setPage: vi.fn(),
  totalPages: 1,
  pageRows: [{ id: 1, name: "Lamp" }],
  ...overrides,
});

describe("AdminListView", () => {
  it("shows the header, the search box, the rows and the extra content", () => {
    render(
      <AdminListView title="Things" description="All of them." searchLabel="Search things" controls={buildControls()} table={table}>
        <p>Dialog area</p>
      </AdminListView>,
    );
    expect(screen.getByRole("heading", { name: "Things" })).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Search things" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Lamp" })).toBeInTheDocument();
    expect(screen.getByText("Dialog area")).toBeInTheDocument();
  });

  it("shows the pagination only when there is more than one page", () => {
    const { rerender } = render(<AdminListView title="T" description="D" searchLabel="S" controls={buildControls()} table={table} />);
    expect(screen.queryByRole("navigation", { name: "Pagination" })).not.toBeInTheDocument();
    rerender(<AdminListView title="T" description="D" searchLabel="S" controls={buildControls({ totalPages: 3 })} table={table} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });
});
