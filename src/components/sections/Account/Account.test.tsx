import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";
import { orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { Account } from "./Account";

const signInAsCustomer = () =>
  useAuthStore.setState({
    isReady: true,
    user: { id: 2, name: "Sample Customer", email: "customer@shop.test", role: "customer", blocked: false, createdAt: 1 },
  });

describe("Account", () => {
  const replace = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    replace.mockClear();
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), replace, back: vi.fn(), refresh: vi.fn() } as never);
    signInAsCustomer();
  });

  it("shows the profile", async () => {
    render(<Account />);
    expect(await screen.findByText("Sample Customer")).toBeInTheDocument();
    expect(screen.getByText("customer@shop.test")).toBeInTheDocument();
  });

  it("invites to shop when there are no orders", async () => {
    render(<Account />);
    expect(await screen.findByRole("heading", { name: "No orders yet" })).toBeInTheDocument();
  });

  it("lists only the orders of the customer with a link to each", async () => {
    const { id, ...mine } = buildOrder({ number: "SH-0001", userId: 2 });
    void id;
    await orderRepository.create(mine);
    await orderRepository.create({ ...mine, number: "SH-0002", userId: 9 });
    render(<Account />);
    expect(await screen.findByRole("link", { name: "SH-0001" })).toHaveAttribute("href", "/account/orders/1");
    expect(screen.queryByRole("link", { name: "SH-0002" })).not.toBeInTheDocument();
  });

  it("signs out and goes home", async () => {
    render(<Account />);
    await userEvent.click(await screen.findByRole("button", { name: "Sign out" }));
    expect(useAuthStore.getState().user).toBeNull();
    expect(replace).toHaveBeenCalledWith("/");
  });
});
