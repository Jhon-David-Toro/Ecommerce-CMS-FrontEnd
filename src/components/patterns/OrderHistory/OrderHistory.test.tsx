import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { buildOrder } from "@/test/factories";

import { OrderHistory } from "./OrderHistory";
import { describeOrder, getAction } from "./OrderHistory.utils";

describe("OrderHistory", () => {
  it("invites to shop when there are no orders", () => {
    render(<OrderHistory orders={[]} />);
    expect(screen.getByRole("heading", { name: "No orders yet" })).toBeInTheDocument();
  });

  it("shows a card with the number, status, total and a link to the details", () => {
    render(<OrderHistory orders={[buildOrder({ id: 4, number: "SH-0004", total: 99, status: "shipped" })]} />);
    expect(screen.getByRole("heading", { name: "Order SH-0004" })).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("$99.00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute("href", "/account/orders/4");
    expect(screen.getByRole("link", { name: "Track order" })).toBeInTheDocument();
  });

  it("lets the customer cancel a pending order", async () => {
    const onCancel = vi.fn();
    const order = buildOrder({ status: "pending" });
    render(<OrderHistory orders={[order]} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel order" }));
    expect(onCancel).toHaveBeenCalledWith(order);
  });

  it("lets the customer buy a delivered order again", async () => {
    const onBuyAgain = vi.fn();
    const order = buildOrder({ status: "delivered" });
    render(<OrderHistory orders={[order]} onBuyAgain={onBuyAgain} />);
    await userEvent.click(screen.getByRole("button", { name: "Buy again" }));
    expect(onBuyAgain).toHaveBeenCalledWith(order);
  });
});

describe("order card helpers", () => {
  it("picks the action by status", () => {
    expect(getAction(buildOrder({ status: "pending" }))).toBe("cancel");
    expect(getAction(buildOrder({ status: "shipped" }))).toBe("track");
    expect(getAction(buildOrder({ status: "delivered" }))).toBe("again");
    expect(getAction(buildOrder({ status: "cancelled" }))).toBeNull();
  });

  it("describes the order with its items and status", () => {
    expect(describeOrder(buildOrder({ status: "shipped" }))).toMatch(/2 items · On its way$/);
  });
});
