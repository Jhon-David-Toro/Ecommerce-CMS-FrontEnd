import { describe, expect, it } from "vitest";

import type { PublicUser } from "@/lib/auth/auth.types";
import { buildOrder, buildProduct, buildReview } from "@/test/factories";

import { buildDashboard } from "./dashboard.utils";

const user = (id: number, role: PublicUser["role"]): PublicUser => ({
  id,
  name: "U",
  email: `${id}@a.test`,
  role,
  blocked: false,
  createdAt: 1,
});

const sources = {
  products: [buildProduct({ id: 1, stock: 3 }), buildProduct({ id: 2, stock: 50 }), buildProduct({ id: 3, stock: 1, status: "draft" })],
  orders: [
    buildOrder({ id: 1, status: "paid", total: 100, createdAt: 1 }),
    buildOrder({ id: 2, status: "pending", total: 40, createdAt: 3 }),
    buildOrder({ id: 3, status: "delivered", total: 60, createdAt: 2 }),
  ],
  users: [user(1, "admin"), user(2, "customer"), user(3, "customer")],
  reviews: [buildReview({ id: 1, status: "pending" }), buildReview({ id: 2, status: "approved" })],
  lowStockThreshold: 10,
};

describe("buildDashboard", () => {
  it("adds up the revenue of paid, shipped and delivered orders only", () => {
    expect(buildDashboard(sources).revenue).toBe(160);
  });

  it("counts orders, products, customers and pending work", () => {
    expect(buildDashboard(sources)).toMatchObject({
      orderCount: 3,
      pendingOrders: 1,
      productCount: 3,
      draftCount: 1,
      customerCount: 2,
      pendingReviews: 1,
    });
  });

  it("lists the newest orders first", () => {
    expect(buildDashboard(sources).recentOrders.map((order) => order.id)).toEqual([2, 3, 1]);
  });

  it("lists the products with low stock, emptiest first", () => {
    expect(buildDashboard(sources).lowStock.map((product) => product.id)).toEqual([3, 1]);
  });
});
