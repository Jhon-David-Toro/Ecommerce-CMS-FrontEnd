import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OrderSummary } from "./OrderSummary";

const totals = { subtotal: 565, discount: 113, shipping: 15, total: 467 };

describe("OrderSummary", () => {
  it("lists the amounts", () => {
    render(<OrderSummary totals={totals} discountPercent={20} />);
    expect(screen.getByText("$565.00")).toBeInTheDocument();
    expect(screen.getByText("-$113.00")).toBeInTheDocument();
    expect(screen.getByText("$15.00")).toBeInTheDocument();
    expect(screen.getByText("$467.00")).toBeInTheDocument();
    expect(screen.getByText("Discount (-20%)")).toBeInTheDocument();
  });

  it("hides the discount row when there is no discount", () => {
    render(<OrderSummary totals={{ ...totals, discount: 0 }} discountPercent={0} />);
    expect(screen.queryByText(/Discount/)).not.toBeInTheDocument();
  });

  it("says when delivery is free", () => {
    render(<OrderSummary totals={{ ...totals, shipping: 0 }} discountPercent={0} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("shows the actions under the totals", () => {
    render(
      <OrderSummary totals={totals} discountPercent={0}>
        <button>Go to Checkout</button>
      </OrderSummary>,
    );
    expect(screen.getByRole("button", { name: "Go to Checkout" })).toBeInTheDocument();
  });
});
