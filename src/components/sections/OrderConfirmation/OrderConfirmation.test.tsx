import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { OrderConfirmation } from "./OrderConfirmation";

describe("OrderConfirmation", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ id: "1" });
  });

  it("thanks the shopper and shows the order", async () => {
    const { id, ...order } = buildOrder();
    void id;
    await orderRepository.create(order);
    render(<OrderConfirmation />);
    expect(await screen.findByRole("heading", { name: "THANK YOU FOR YOUR ORDER!" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Order SH-0001" })).toBeInTheDocument();
    expect(screen.getByText(/We sent the details to customer@shop.test/)).toBeInTheDocument();
  });

  it("says when the order does not exist", async () => {
    vi.mocked(useParams).mockReturnValue({ id: "99" });
    render(<OrderConfirmation />);
    expect(await screen.findByRole("heading", { name: "Order not found" })).toBeInTheDocument();
  });
});
