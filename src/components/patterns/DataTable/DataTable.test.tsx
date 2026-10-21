import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DataTable } from "./DataTable";
import type { Column } from "./DataTable.types";

interface Row {
  id: number;
  name: string;
  price: number;
}

const columns: Column<Row>[] = [
  { key: "name", header: "Name", render: (row) => row.name },
  { key: "price", header: "Price", align: "right", render: (row) => `$${row.price}` },
];

const rows: Row[] = [
  { id: 1, name: "Shirt", price: 10 },
  { id: 2, name: "Jeans", price: 20 },
];

describe("DataTable", () => {
  it("renders a header per column and a row per item", () => {
    render(<DataTable caption="Products" columns={columns} rows={rows} getRowKey={(row) => row.id} />);
    expect(screen.getAllByRole("columnheader").map((header) => header.textContent)).toEqual(["Name", "Price"]);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByRole("cell", { name: "$20" })).toBeInTheDocument();
  });

  it("names the table", () => {
    render(<DataTable caption="Products" columns={columns} rows={rows} getRowKey={(row) => row.id} />);
    expect(screen.getByRole("table", { name: "Products" })).toBeInTheDocument();
  });

  it("shows the empty message without rows", () => {
    render(<DataTable caption="Products" columns={columns} rows={[]} getRowKey={(row) => row.id} emptyTitle="No products" />);
    expect(screen.getByRole("heading", { name: "No products" })).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
