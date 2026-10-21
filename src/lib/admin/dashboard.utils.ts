import { isLowStock } from "@/lib/catalog/catalog.utils";
import { getRevenue } from "@/lib/orders/order.utils";

import { RECENT_ORDERS_LIMIT } from "./dashboard.constants";
import type { DashboardData, DashboardSources } from "./dashboard.types";

/**
 * Summarizes the store for the admin dashboard.
 *
 * @param sources Data to summarize.
 * @param sources.products All products, drafts included.
 * @param sources.orders All orders.
 * @param sources.users All users.
 * @param sources.reviews All reviews.
 * @param sources.lowStockThreshold Stock at or under which a product counts as low.
 * @returns Revenue, counters, the latest orders and the products that need restocking.
 */
export const buildDashboard = ({ products, orders, users, reviews, lowStockThreshold }: DashboardSources): DashboardData => ({
  revenue: getRevenue(orders),
  orderCount: orders.length,
  pendingOrders: orders.filter((order) => order.status === "pending").length,
  productCount: products.length,
  draftCount: products.filter((product) => product.status === "draft").length,
  customerCount: users.filter((user) => user.role === "customer").length,
  pendingReviews: reviews.filter((review) => review.status === "pending").length,
  recentOrders: [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, RECENT_ORDERS_LIMIT),
  lowStock: products.filter((product) => isLowStock(product, lowStockThreshold)).sort((a, b) => a.stock - b.stock),
});
