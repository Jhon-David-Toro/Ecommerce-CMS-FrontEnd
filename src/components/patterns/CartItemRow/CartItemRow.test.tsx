import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { CartItem } from "@/lib/cart/cart.types";

import { CartItemRow } from "./CartItemRow";

const item: CartItem = {
  productId: 7,
  name: "Checkered Shirt",
  image: "/shirt.png",
  price: 90,
  quantity: 2,
  color: "Red",
  size: "Medium",
  stock: 5,
};

const renderRow = (onQuantityChange = vi.fn(), onRemove = vi.fn()) =>
  render(
    <ul>
      <CartItemRow item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
    </ul>,
  );

describe("CartItemRow", () => {
  it("shows the product with its options and the line total", () => {
    renderRow();
    expect(screen.getByRole("link", { name: "Checkered Shirt" })).toHaveAttribute("href", "/product-details/7");
    expect(screen.getByText("Size: Medium")).toBeInTheDocument();
    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("$180.00")).toBeInTheDocument();
  });

  it("reports the new quantity with the line key", async () => {
    const onQuantityChange = vi.fn();
    renderRow(onQuantityChange);
    await userEvent.click(screen.getByRole("button", { name: "+" }));
    expect(onQuantityChange).toHaveBeenCalledWith("7-Red-Medium", 3);
  });

  it("removes the line", async () => {
    const onRemove = vi.fn();
    renderRow(vi.fn(), onRemove);
    await userEvent.click(screen.getByRole("button", { name: "Remove Checkered Shirt" }));
    expect(onRemove).toHaveBeenCalledWith("7-Red-Medium");
  });
});
