import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { AdminOrders } from "./AdminOrders";
import { filterByStatus, matchesOrder } from "./AdminOrders.utils";

/**
 * Stores two orders: one pending and one delivered.
 */
const seedOrders = async () => {
  const { id, ...pending } = buildOrder();
  const { id: otherId, ...delivered } = buildOrder({
    number: "SH-0002",
    status: "delivered",
    address: { ...buildOrder().address, fullName: "Luis Perez" },
  });
  void id;
  void otherId;
  await orderRepository.create(pending);
  await orderRepository.create(delivered);
};

describe("AdminOrders", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows an empty message without orders", async () => {
    render(<AdminOrders />);
    expect(await screen.findByText("No orders found")).toBeInTheDocument();
  });

  it("lists orders with links to their detail", async () => {
    await seedOrders();
    render(<AdminOrders />);
    expect(await screen.findByRole("link", { name: "SH-0001" })).toHaveAttribute("href", "/admin/orders/1");
    expect(screen.getByRole("link", { name: "SH-0002" })).toBeInTheDocument();
  });

  it("filters by status", async () => {
    await seedOrders();
    render(<AdminOrders />);
    await userEvent.selectOptions(await screen.findByLabelText("Status"), "delivered");
    const table = screen.getByRole("table", { name: "Orders" });
    expect(within(table).getAllByRole("row")).toHaveLength(2);
    expect(within(table).getByText("SH-0002")).toBeInTheDocument();
  });

  it("searches by customer name", async () => {
    await seedOrders();
    render(<AdminOrders />);
    await userEvent.type(await screen.findByRole("searchbox", { name: "Search orders" }), "luis");
    expect(within(screen.getByRole("table", { name: "Orders" })).getAllByRole("row")).toHaveLength(2);
  });
});

describe("AdminOrders utils", () => {
  it("matches by number, email and name", () => {
    const order = buildOrder();
    expect(matchesOrder(order, "sh-0001")).toBe(true);
    expect(matchesOrder(order, "customer@")).toBe(true);
    expect(matchesOrder(order, "ana")).toBe(true);
    expect(matchesOrder(order, "zzz")).toBe(false);
  });

  it("filters by status and keeps everything when empty", () => {
    const orders = [buildOrder(), buildOrder({ id: 2, status: "paid" })];
    expect(filterByStatus(orders, "paid")).toHaveLength(1);
    expect(filterByStatus(orders, "")).toHaveLength(2);
  });
});
