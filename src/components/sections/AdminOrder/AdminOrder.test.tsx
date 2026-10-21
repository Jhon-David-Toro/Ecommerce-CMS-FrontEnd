import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getOrder, orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { AdminOrder } from "./AdminOrder";

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

  it("walks the order from pending to shipped with the buttons", async () => {
    const { id, ...order } = buildOrder();
    void id;
    await orderRepository.create(order);
    render(<AdminOrder />);
    await userEvent.click(await screen.findByRole("button", { name: "Confirm payment" }));
    await userEvent.click(await screen.findByRole("button", { name: "Mark as shipped" }));
    expect(await screen.findByRole("button", { name: "Mark as delivered" })).toBeInTheDocument();
    expect((await getOrder(1))?.status).toBe("shipped");
  });

  it("cancels an order", async () => {
    const { id, ...order } = buildOrder();
    void id;
    await orderRepository.create(order);
    render(<AdminOrder />);
    await userEvent.click(await screen.findByRole("button", { name: "Cancel order" }));
    expect((await getOrder(1))?.status).toBe("cancelled");
    expect(await screen.findByText("Cancelled")).toBeInTheDocument();
  });
});
