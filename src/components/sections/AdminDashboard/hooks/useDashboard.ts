import { useMemo, useState } from "react";

import { buildDashboard } from "@/lib/admin/dashboard.utils";
import { listUsers } from "@/lib/auth/auth.api";
import { listProducts } from "@/lib/catalog/catalog.api";
import { listReviews } from "@/lib/catalog/reviews.api";
import { listOrders } from "@/lib/orders/orders.api";
import { getSettings } from "@/lib/settings/settings.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { ALL_PRODUCTS, DEFAULT_RANGE, NO_FILTER } from "../AdminDashboard.constants";
import { filterByRange } from "../AdminDashboard.utils";

/**
 * Loads everything the dashboard summarizes and keeps the time range the orders are counted in.
 *
 * @returns The dashboard data (null until every source has loaded), the range and its setter.
 */
export const useDashboard = () => {
  const { data: products } = useQuery(listProducts, ALL_PRODUCTS);
  const { data: orders } = useQuery(listOrders, NO_FILTER);
  const { data: users } = useQuery(listUsers, undefined);
  const { data: reviews } = useQuery(listReviews, NO_FILTER);
  const { data: settings } = useQuery(getSettings, undefined);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [now] = useState(Date.now);

  const dashboard = useMemo(
    () =>
      products && orders && users && reviews && settings
        ? buildDashboard({
            products,
            orders: filterByRange(orders, range, now),
            users,
            reviews,
            lowStockThreshold: settings.lowStockThreshold,
          })
        : null,
    [products, orders, users, reviews, settings, range, now],
  );

  return { dashboard, range, setRange };
};
