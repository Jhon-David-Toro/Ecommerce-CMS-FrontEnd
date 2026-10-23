import type { PublicUser } from "@/lib/auth/auth.types";
import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";
import type { Order } from "@/lib/orders/order.types";

export interface DashboardSources {
  products: Product[];
  orders: Order[];
  users: PublicUser[];
  reviews: Review[];
  lowStockThreshold: number;
}

export interface DashboardData {
  revenue: number;
  orderCount: number;
  pendingOrders: number;
  productCount: number;
  draftCount: number;
  customerCount: number;
  pendingReviews: number;
  recentOrders: Order[];
  lowStock: Product[];
}
