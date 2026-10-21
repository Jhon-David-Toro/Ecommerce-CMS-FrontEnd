import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildOrder } from "@/test/factories";

import { OrderDetails } from "./OrderDetails";

describe("OrderDetails", () => {
  it("shows the number, the status and the date", () => {
    render(<OrderDetails order={buildOrder()} />);
    expect(screen.getByRole("heading", { name: "Order SH-0001" })).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Placed on June 1, 2025")).toBeInTheDocument();
  });

  it("lists the items with their line totals", () => {
    render(<OrderDetails order={buildOrder()} />);
    expect(screen.getByText("Test shirt")).toBeInTheDocument();
    expect(screen.getByText("Medium · Black · x2")).toBeInTheDocument();
    expect(screen.getAllByText("$200.00").length).toBeGreaterThan(0);
  });

  it("shows the delivery address and the payment method", () => {
    render(<OrderDetails order={buildOrder({ notes: "Ring twice" })} />);
    const address = screen.getByRole("region", { name: "Delivery address" });
    expect(address).toHaveTextContent("Ana Gomez");
    expect(address).toHaveTextContent("Lima 15001");
    expect(screen.getByRole("region", { name: "Payment" })).toHaveTextContent("Cash on delivery");
    expect(screen.getByText("Notes: Ring twice")).toBeInTheDocument();
  });

  it("shows the totals and the extra controls", () => {
    render(
      <OrderDetails order={buildOrder()}>
        <button>Mark as shipped</button>
      </OrderDetails>,
    );
    expect(screen.getByText("Discount (-20%)")).toBeInTheDocument();
    expect(screen.getByText("$175.00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mark as shipped" })).toBeInTheDocument();
  });
});
