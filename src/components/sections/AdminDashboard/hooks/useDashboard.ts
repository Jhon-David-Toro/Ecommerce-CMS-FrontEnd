import { useMemo } from "react";

import { buildDashboard } from "@/lib/admin/dashboard.utils";
import { listUsers } from "@/lib/auth/auth.api";
import { listProducts } from "@/lib/catalog/catalog.api";
import { listReviews } from "@/lib/catalog/reviews.api";
import { listOrders } from "@/lib/orders/orders.api";
import { getSettings } from "@/lib/settings/settings.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { ALL_PRODUCTS, NO_FILTER } from "../AdminDashboard.constants";

/**
 * Loads everything the dashboard summarizes.
 *
 * @returns The dashboard data, or null until every source has loaded.
 */
export const useDashboard = () => {
  const { data: products } = useQuery(listProducts, ALL_PRODUCTS);
  const { data: orders } = useQuery(listOrders, NO_FILTER);
  const { data: users } = useQuery(listUsers, undefined);
  const { data: reviews } = useQuery(listReviews, NO_FILTER);
  const { data: settings } = useQuery(getSettings, undefined);

  return useMemo(
    () =>
      products && orders && users && reviews && settings
        ? buildDashboard({ products, orders, users, reviews, lowStockThreshold: settings.lowStockThreshold })
        : null,
    [products, orders, users, reviews, settings],
  );
};
