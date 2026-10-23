import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listCategories } from "@/lib/taxonomy/taxonomy.api";

import { AdminCategories } from "./AdminCategories";

describe("AdminCategories", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the categories", async () => {
    render(<AdminCategories />);
    expect(await screen.findByRole("cell", { name: "T-Shirts" })).toBeInTheDocument();
    expect(screen.getAllByRole("cell", { name: "Visible" }).length).toBeGreaterThan(0);
  });

  it("creates a category", async () => {
    render(<AdminCategories />);
    await userEvent.click(await screen.findByRole("button", { name: "New category" }));
    await userEvent.type(screen.getByLabelText("Name"), "Dresses");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByRole("cell", { name: "Dresses" })).toBeInTheDocument();
    expect((await listCategories()).find((category) => category.name === "Dresses")?.slug).toBe("dresses");
  });

  it("edits a category", async () => {
    render(<AdminCategories />);
    await userEvent.click(await screen.findByRole("button", { name: "Edit Jeans" }));
    const name = screen.getByLabelText("Name");
    await userEvent.clear(name);
    await userEvent.type(name, "Denim");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByRole("cell", { name: "Denim" })).toBeInTheDocument();
  });

  it("deletes a category after confirming", async () => {
    render(<AdminCategories />);
    await userEvent.click(await screen.findByRole("button", { name: "Delete Shorts" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("heading", { name: "Categories" });
    expect((await listCategories()).some((category) => category.name === "Shorts")).toBe(false);
  });
});
