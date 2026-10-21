import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getOrder, orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { AdminOrder } from "./AdminOrder";
import { toOrderStatus } from "./AdminOrder.utils";

describe("AdminOrder", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ id: "1" } as never);
  });

  it("shows a message when the order does not exist", async () => {
    render(<AdminOrder />);
    expect(await screen.findByText("Order not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to orders" })).toHaveAttribute("href", "/admin/orders");
  });

  it("shows the order and changes its status", async () => {
    const { id, ...order } = buildOrder();
    void id;
    await orderRepository.create(order);
    render(<AdminOrder />);
    const select = await screen.findByLabelText("Order status");
    expect(select).toHaveValue("pending");
    await userEvent.selectOptions(select, "shipped");
    expect(await screen.findByDisplayValue("Shipped")).toBeInTheDocument();
    expect((await getOrder(1))?.status).toBe("shipped");
  });
});

describe("toOrderStatus", () => {
  it("returns known statuses and falls back to pending", () => {
    expect(toOrderStatus("paid")).toBe("paid");
    expect(toOrderStatus("nope")).toBe("pending");
  });
});
