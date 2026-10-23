import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";
import { useCartStore } from "@/lib/cart/cartStore";
import { listOrders } from "@/lib/orders/orders.api";

import { Checkout } from "./Checkout";
import { buildOrderInput } from "./Checkout.utils";

const line = { productId: 1, name: "Gradient Shirt", image: "/a.png", price: 100, quantity: 2, color: "White", size: "Large", stock: 9 };

describe("Checkout", () => {
  const push = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    push.mockClear();
    useAuthStore.setState({ user: null, isReady: true });
    useCartStore.setState({ items: [], promoCode: "", isReady: false });
    vi.mocked(useRouter).mockReturnValue({ push, replace: vi.fn(), back: vi.fn(), refresh: vi.fn() } as never);
  });

  it("explains that there is nothing to check out when the cart is empty", async () => {
    render(<Checkout />);
    expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });

  it("lists what is being bought", async () => {
    useCartStore.getState().addItem(line);
    render(<Checkout />);
    expect(await screen.findByRole("list", { name: "Items in your order" })).toHaveTextContent("Gradient Shirt");
  });

  it("places the order, empties the cart and opens the confirmation", async () => {
    useCartStore.getState().addItem(line);
    render(<Checkout />);
    await userEvent.type(await screen.findByLabelText("Email"), "guest@mail.test");
    await userEvent.type(screen.getByLabelText("Phone"), "555 1234");
    await userEvent.type(screen.getByLabelText("Full name"), "Ana Gomez");
    await userEvent.type(screen.getByLabelText("Street address"), "12 Main St");
    await userEvent.type(screen.getByLabelText("City"), "Lima");
    await userEvent.type(screen.getByLabelText("Postal code"), "15001");
    await userEvent.type(screen.getByLabelText("Country"), "Peru");
    await userEvent.click(screen.getByRole("button", { name: "Place order" }));
    await waitFor(() => expect(push).toHaveBeenCalledWith("/checkout/success/1"));
    expect(useCartStore.getState().items).toEqual([]);
    expect((await listOrders())[0]).toMatchObject({ email: "guest@mail.test", userId: null, number: "SH-0001" });
  });
});

describe("buildOrderInput", () => {
  it("drops the stock from the lines and trims the text", () => {
    const input = buildOrderInput({
      values: {
        email: " A@B.co ",
        phone: "1",
        fullName: " Ana ",
        street: "s",
        city: "c",
        state: "",
        postalCode: "p",
        country: "k",
        notes: " hi ",
        paymentMethod: "bank_transfer",
      },
      items: [line],
      totals: { subtotal: 200, discount: 0, shipping: 15, total: 215 },
      userId: 3,
    });
    expect(input.email).toBe("a@b.co");
    expect(input.address.fullName).toBe("Ana");
    expect(input.items[0]).not.toHaveProperty("stock");
    expect(input).toMatchObject({ userId: 3, total: 215, notes: "hi" });
  });
});
