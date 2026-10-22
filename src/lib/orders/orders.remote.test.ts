import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import type { OrderInput } from "./order.types";
import { createOrder, getOrder, listOrders, setOrderStatus } from "./orders.remote";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const admin = { id: 1, name: "Admin", email: "a@shop.test", role: "admin" as const, blocked: false, createdAt: 1 };
const customer = { ...admin, id: 2, role: "customer" as const };

const input: OrderInput = {
  userId: 2,
  email: "ana@shop.test",
  items: [{ productId: 7, name: "Tee", image: "x", price: 120, quantity: 2, color: "Navy", size: "Small" }],
  subtotal: 240,
  discount: 0,
  shipping: 0,
  total: 240,
  paymentMethod: "cash_on_delivery",
  address: { fullName: "Ana", phone: "1", street: "S", city: "C", state: "", postalCode: "", country: "AW" },
  notes: "",
};

describe("orders against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, [])));
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({ user: customer, isReady: true });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("lists the orders of the session for a customer and every order without a user", async () => {
    await listOrders({ userId: 2 });
    await listOrders();
    expect(fetchMock.mock.calls.map(([path]) => path)).toEqual(["/api/orders", "/api/admin/orders"]);
  });

  it("answers null for an order that is not found", async () => {
    fetchMock.mockImplementation(() => Promise.resolve(answer(404, { code: "ORDER_NOT_FOUND", message: "no" })));
    expect(await getOrder(9)).toBeNull();
  });

  it("sends only what the customer decides and never the prices", async () => {
    await createOrder(input, " SHOP20 ");
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/orders");
    expect(body.items).toEqual([{ productId: 7, color: "Navy", size: "Small", quantity: 2 }]);
    expect(body).toMatchObject({ email: "ana@shop.test", paymentMethod: "cash_on_delivery", promoCode: "SHOP20" });
    expect(body).not.toHaveProperty("total");
    expect(body).not.toHaveProperty("subtotal");
  });

  it("omits the promo code when there is none", async () => {
    await createOrder(input);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).not.toHaveProperty("promoCode");
  });

  it("lets customers cancel and administrators set any status", async () => {
    await setOrderStatus(5, "cancelled");
    expect(fetchMock.mock.calls[0]).toEqual(["/api/orders/5/cancel", expect.objectContaining({ method: "POST" })]);

    useAuthStore.setState({ user: admin });
    await setOrderStatus(5, "paid");
    expect(fetchMock.mock.calls[1][0]).toBe("/api/admin/orders/5/status");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({ status: "paid" });
  });
});
