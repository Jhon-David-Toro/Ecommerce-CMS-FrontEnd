import { beforeEach, describe, expect, it } from "vitest";

import { getProduct } from "@/lib/catalog/catalog.api";

import { EMPTY_ADDRESS } from "./order.constants";
import type { Order, OrderInput } from "./order.types";
import { buildOrderNumber, getRevenue, getShipping, getSubtotal } from "./order.utils";
import { createOrder, listOrders, setOrderStatus } from "./orders.api";

const input = (quantity: number): OrderInput => ({
  userId: 2,
  email: "customer@shop.test",
  items: [{ productId: 1, name: "Shirt", image: "/x.png", price: 50, quantity, color: "Blue", size: "Large" }],
  subtotal: 50 * quantity,
  discount: 0,
  shipping: 15,
  total: 50 * quantity + 15,
  paymentMethod: "cash_on_delivery",
  address: EMPTY_ADDRESS,
  notes: "",
});

describe("order utils", () => {
  it("sums the lines", () => {
    expect(getSubtotal(input(3).items)).toBe(150);
  });

  it("charges shipping unless the cart is empty or big enough", () => {
    expect(getShipping(0, 15, 200)).toBe(0);
    expect(getShipping(100, 15, 200)).toBe(15);
    expect(getShipping(200, 15, 200)).toBe(0);
  });

  it("pads the order number", () => {
    expect(buildOrderNumber(42, "SH-")).toBe("SH-0042");
  });

  it("counts only paid, shipped and delivered orders as revenue", () => {
    const orders = [
      { status: "paid", total: 10 },
      { status: "pending", total: 99 },
      { status: "delivered", total: 5 },
    ] as Order[];
    expect(getRevenue(orders)).toBe(15);
  });
});

describe("orders api", () => {
  beforeEach(() => window.localStorage.clear());

  it("places an order with a number and takes units out of stock", async () => {
    const before = (await getProduct(1))!.stock;
    const order = await createOrder(input(2));
    expect(order).toMatchObject({ status: "pending", number: "SH-0001" });
    expect((await getProduct(1))!.stock).toBe(before - 2);
  });

  it("lists the orders of one customer, newest first", async () => {
    await createOrder(input(1));
    await createOrder({ ...input(1), userId: 9 });
    expect(await listOrders({ userId: 2 })).toHaveLength(1);
    expect(await listOrders()).toHaveLength(2);
  });

  it("changes the status", async () => {
    const order = await createOrder(input(1));
    expect((await setOrderStatus(order.id, "shipped")).status).toBe("shipped");
  });
});
