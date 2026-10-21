import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildOrder } from "@/test/factories";

import { OrderHistory } from "./OrderHistory";

describe("OrderHistory", () => {
  it("invites to shop when there are no orders", () => {
    render(<OrderHistory orders={[]} />);
    expect(screen.getByRole("heading", { name: "No orders yet" })).toBeInTheDocument();
  });

  it("lists every order with its status and total", () => {
    render(<OrderHistory orders={[buildOrder({ id: 4, number: "SH-0004", total: 99, status: "shipped" })]} />);
    expect(screen.getByRole("link", { name: "SH-0004" })).toHaveAttribute("href", "/account/orders/4");
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("$99.00")).toBeInTheDocument();
  });
});
