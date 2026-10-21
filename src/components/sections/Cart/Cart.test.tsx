import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import type { CartItem } from "@/lib/cart/cart.types";
import { useCartStore } from "@/lib/cart/cartStore";

import { Cart } from "./Cart";

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  productId: 1,
  name: "Gradient Shirt",
  image: "/a.png",
  price: 100,
  quantity: 1,
  color: "White",
  size: "Large",
  stock: 5,
  ...overrides,
});

describe("Cart", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useCartStore.setState({ items: [], promoCode: "", isReady: false });
  });

  it("invites the shopper to keep shopping when the cart is empty", async () => {
    render(<Cart />);
    expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continue shopping" })).toHaveAttribute("href", "/products");
  });

  it("lists the lines and the totals", async () => {
    useCartStore.getState().addItem(item({ price: 90, quantity: 2 }));
    render(<Cart />);
    expect(await screen.findByRole("heading", { name: "YOUR CART" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gradient Shirt" })).toBeInTheDocument();
    expect(await screen.findByText("$195.00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go to Checkout" })).toHaveAttribute("href", "/checkout");
  });

  it("removes a line", async () => {
    useCartStore.getState().addItem(item());
    render(<Cart />);
    await userEvent.click(await screen.findByRole("button", { name: "Remove Gradient Shirt" }));
    expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });

  it("applies a valid promo code", async () => {
    useCartStore.getState().addItem(item());
    render(<Cart />);
    await userEvent.type(await screen.findByRole("textbox", { name: "Promo code" }), "SHOP20");
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(await screen.findByText("20% discount applied.")).toBeInTheDocument();
  });
});
