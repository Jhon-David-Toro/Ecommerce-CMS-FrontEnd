import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CartPage from "./page";

describe("CartPage", () => {
  it("renders the cart", async () => {
    render(<CartPage />);
    expect(await screen.findByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
  });
});
