import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProduct, listProducts } from "@/lib/catalog/catalog.api";

import { AdminProductForm } from "./AdminProductForm";

describe("AdminProductForm", () => {
  const push = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    push.mockClear();
    vi.mocked(useRouter).mockReturnValue({ push, replace: vi.fn(), back: vi.fn(), refresh: vi.fn() } as never);
  });

  it("asks for the required data of a new product", async () => {
    render(<AdminProductForm />);
    await userEvent.click(screen.getByRole("button", { name: "Save product" }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(4);
    expect(push).not.toHaveBeenCalled();
  });

  it("creates a product and returns to the list", async () => {
    render(<AdminProductForm />);
    await userEvent.type(screen.getByLabelText("Name"), "Wool Sweater");
    await userEvent.selectOptions(await screen.findByLabelText("Category"), "Hoodie");
    await userEvent.selectOptions(screen.getByLabelText("Brand"), "Zara");
    await userEvent.type(screen.getByLabelText("Price"), "120");
    await userEvent.type(screen.getByLabelText("Main image address"), "https://img.test/wool.png");
    await userEvent.selectOptions(screen.getByLabelText("Status"), "published");
    await userEvent.click(screen.getByRole("button", { name: "Save product" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin/products"));
    const saved = (await listProducts({ includeDrafts: true })).find((product) => product.name === "Wool Sweater");
    expect(saved).toMatchObject({ slug: "wool-sweater", price: 120, status: "published", sizes: ["Medium"] });
  });

  it("loads an existing product into the form and saves the changes", async () => {
    render(<AdminProductForm productId={1} />);
    const name = await screen.findByLabelText("Name");
    expect(name).toHaveValue("One Life Graphic T-Shirt");
    await userEvent.clear(name);
    await userEvent.type(name, "Renamed Shirt");
    await userEvent.click(screen.getByRole("button", { name: "Save product" }));
    await waitFor(() => expect(push).toHaveBeenCalled());
    expect((await getProduct(1))!.name).toBe("Renamed Shirt");
  });

  it("says when the product does not exist", async () => {
    render(<AdminProductForm productId={9999} />);
    expect(await screen.findByRole("heading", { name: "Product not found" })).toBeInTheDocument();
  });
});
