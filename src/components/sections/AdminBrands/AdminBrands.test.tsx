import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listBrands } from "@/lib/taxonomy/taxonomy.api";

import { AdminBrands } from "./AdminBrands";

describe("AdminBrands", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the brands", async () => {
    render(<AdminBrands />);
    expect(await screen.findByRole("cell", { name: "Zara" })).toBeInTheDocument();
  });

  it("creates a brand", async () => {
    render(<AdminBrands />);
    await userEvent.click(await screen.findByRole("button", { name: "New brand" }));
    await userEvent.type(screen.getByLabelText("Name"), "Nike");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByRole("cell", { name: "Nike" })).toBeInTheDocument();
    expect((await listBrands()).some((brand) => brand.slug === "nike")).toBe(true);
  });

  it("hides a brand from the store", async () => {
    render(<AdminBrands />);
    await userEvent.click(await screen.findByRole("button", { name: "Edit Gucci" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Visible in the store" }));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByRole("cell", { name: "Hidden" })).toBeInTheDocument();
  });

  it("deletes a brand after confirming", async () => {
    render(<AdminBrands />);
    await userEvent.click(await screen.findByRole("button", { name: "Delete Prada" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("heading", { name: "Brands" });
    expect((await listBrands()).some((brand) => brand.name === "Prada")).toBe(false);
  });
});
