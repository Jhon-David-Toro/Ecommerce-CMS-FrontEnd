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

  it("changes the name of the customer", async () => {
    render(<Account />);
    await userEvent.click(await screen.findByRole("button", { name: "Account settings" }));
    const name = screen.getByLabelText("Full name");
    await userEvent.clear(name);
    await userEvent.type(name, "Renamed Customer");
    await userEvent.click(screen.getByRole("button", { name: "Save details" }));
    expect(await screen.findByText("Your details were updated.")).toBeInTheDocument();
    expect(useAuthStore.getState().user?.name).toBe("Renamed Customer");
  });

  it("rejects a wrong current password", async () => {
    render(<Account />);
    await userEvent.click(await screen.findByRole("button", { name: "Account settings" }));
    await userEvent.type(screen.getByLabelText("Current password"), "wrong-one");
    await userEvent.type(screen.getByLabelText("New password"), "newpass1");
    await userEvent.type(screen.getByLabelText("Repeat new password"), "newpass1");
    await userEvent.click(screen.getByRole("button", { name: "Change password" }));
    expect(await screen.findByText("The current password is not correct.")).toBeInTheDocument();
  });

  it("signs out and goes home", async () => {
    render(<Account />);
    await userEvent.click(await screen.findByRole("button", { name: "Sign out" }));
    expect(useAuthStore.getState().user).toBeNull();
    expect(replace).toHaveBeenCalledWith("/");
  });
});
