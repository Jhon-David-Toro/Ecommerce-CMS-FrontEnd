import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";
import { orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { AccountOrder } from "./AccountOrder";

describe("AccountOrder", () => {
  beforeEach(async () => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ id: "1" });
    useAuthStore.setState({
      isReady: true,
      user: { id: 2, name: "Ana", email: "a@a.test", role: "customer", blocked: false, createdAt: 1 },
    });
    const { id, ...order } = buildOrder({ userId: 2 });
    void id;
    await orderRepository.create(order);
  });

  it("shows the order of the customer", async () => {
    render(<AccountOrder />);
    expect(await screen.findByRole("heading", { name: "Order SH-0001" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My account" })).toHaveAttribute("href", "/account");
  });

  it("treats the order of another customer as missing", async () => {
    useAuthStore.setState({
      isReady: true,
      user: { id: 5, name: "Bo", email: "b@b.test", role: "customer", blocked: false, createdAt: 1 },
    });
    render(<AccountOrder />);
    expect(await screen.findByRole("heading", { name: "Order not found" })).toBeInTheDocument();
  });
});
