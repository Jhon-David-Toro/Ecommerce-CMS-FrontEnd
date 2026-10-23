import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { orderRepository } from "@/lib/orders/orders.api";
import { buildOrder } from "@/test/factories";

import { AdminDashboard } from "./AdminDashboard";
import { filterByRange } from "./AdminDashboard.utils";

describe("AdminDashboard", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the counters of the store", async () => {
    render(<AdminDashboard />);
    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.getByText("Everything is well stocked")).toBeInTheDocument();
  });

  it("says when there are no orders", async () => {
    render(<AdminDashboard />);
    expect(await screen.findByRole("heading", { name: "No orders yet" })).toBeInTheDocument();
  });

  it("lists recent orders with a link to each", async () => {
    const { id, ...order } = buildOrder({ createdAt: Date.now(), number: "SH-0007", status: "paid", total: 80 });
    void id;
    await orderRepository.create(order);
    render(<AdminDashboard />);
    expect(await screen.findByRole("link", { name: "SH-0007" })).toHaveAttribute("href", "/admin/orders/1");
    expect(screen.getAllByText("$80.00").length).toBeGreaterThan(0);
  });
});

describe("filterByRange", () => {
  const day = 24 * 60 * 60 * 1000;
  const orders = [buildOrder({ id: 1, createdAt: 100 * day }), buildOrder({ id: 2, createdAt: 95 * day })];

  it("keeps the orders inside the range", () => {
    expect(filterByRange(orders, "3", 100 * day).map((order) => order.id)).toEqual([1]);
  });

  it("keeps everything for all time", () => {
    expect(filterByRange(orders, "all", 100 * day)).toHaveLength(2);
  });
});
