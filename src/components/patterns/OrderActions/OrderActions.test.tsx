import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { buildOrder } from "@/test/factories";

import { OrderActions } from "./OrderActions";
import { getActions } from "./OrderActions.utils";

describe("OrderActions", () => {
  it("offers to confirm payment or cancel a pending order", async () => {
    const onChange = vi.fn();
    render(<OrderActions order={buildOrder({ status: "pending" })} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm payment" }));
    expect(onChange).toHaveBeenCalledWith(1, "paid");
    await userEvent.click(screen.getByRole("button", { name: "Cancel order" }));
    expect(onChange).toHaveBeenCalledWith(1, "cancelled");
  });

  it("offers nothing for a delivered order", () => {
    render(<OrderActions order={buildOrder({ status: "delivered" })} onChange={vi.fn()} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("keeps the labels as accessible names when compact", () => {
    render(<OrderActions order={buildOrder({ status: "paid" })} onChange={vi.fn()} compact />);
    expect(screen.getByRole("button", { name: "Mark as shipped" })).toHaveTextContent("");
  });
});

describe("getActions", () => {
  it("walks the order flow", () => {
    expect(getActions("paid", "Cancel").map((action) => action.to)).toEqual(["shipped", "cancelled"]);
    expect(getActions("shipped", "Cancel").map((action) => action.to)).toEqual(["delivered", "cancelled"]);
    expect(getActions("cancelled", "Cancel")).toEqual([]);
  });
});
