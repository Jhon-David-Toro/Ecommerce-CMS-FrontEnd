import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { getProduct, listProducts, productRepository } from "@/lib/catalog/catalog.api";
import { buildProduct } from "@/test/factories";

import { AdminProducts } from "./AdminProducts";
import { filterByStatus, matchesProduct } from "./AdminProducts.utils";

describe("AdminProducts", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the products with links to edit them", async () => {
    render(<AdminProducts />);
    expect(await screen.findByRole("link", { name: "One Life Graphic T-Shirt" })).toHaveAttribute("href", "/admin/products/1");
    expect(screen.getByRole("link", { name: "New product" })).toHaveAttribute("href", "/admin/products/new");
  });

  it("searches by name", async () => {
    render(<AdminProducts />);
    await userEvent.type(await screen.findByRole("searchbox", { name: "Search products" }), "one life");
    const table = screen.getByRole("table", { name: "Products" });
    expect(within(table).getAllByRole("row")).toHaveLength(2);
  });

  it("filters by status", async () => {
    const { id, ...draft } = buildProduct({ name: "Secret draft", status: "draft" });
    void id;
    await productRepository.create(draft);
    render(<AdminProducts />);
    await userEvent.selectOptions(await screen.findByLabelText("Status"), "draft");
    expect(screen.getByRole("link", { name: "Secret draft" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "One Life Graphic T-Shirt" })).not.toBeInTheDocument();
  });

  it("deletes a product after confirming", async () => {
    render(<AdminProducts />);
    await userEvent.click(await screen.findByRole("button", { name: "Delete One Life Graphic T-Shirt" }));
    expect(screen.getByRole("alertdialog", { name: "Delete product?" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(await screen.findByRole("heading", { name: "Products" })).toBeInTheDocument();
    expect(await getProduct(1)).toBeNull();
    expect((await listProducts()).some((product) => product.id === 1)).toBe(false);
  });

  it("keeps the product when the dialog is cancelled", async () => {
    render(<AdminProducts />);
    await userEvent.click(await screen.findByRole("button", { name: "Delete One Life Graphic T-Shirt" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(await getProduct(1)).not.toBeNull();
  });
});

describe("product table helpers", () => {
  it("matches name, category and brand", () => {
    const product = buildProduct({ name: "Gradient Shirt", category: "Shirts", brand: "Gucci" });
    expect(matchesProduct(product, "gradient")).toBe(true);
    expect(matchesProduct(product, "gucci")).toBe(true);
    expect(matchesProduct(product, "zzz")).toBe(false);
  });

  it("filters by status and keeps everything for an empty status", () => {
    const products = [buildProduct({ id: 1, status: "draft" }), buildProduct({ id: 2, status: "published" })];
    expect(filterByStatus(products, "draft").map((product) => product.id)).toEqual([1]);
    expect(filterByStatus(products, "")).toHaveLength(2);
  });
});
