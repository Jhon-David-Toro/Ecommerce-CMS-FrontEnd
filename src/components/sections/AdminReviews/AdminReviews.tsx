"use client";

import { useState } from "react";

import { AdminListView } from "@/components/patterns/AdminListView";
import { FilterSelect } from "@/components/patterns/FilterSelect";
import { Spinner } from "@/components/ui/Spinner";
import { listProducts } from "@/lib/catalog/catalog.api";
import { listReviews } from "@/lib/catalog/reviews.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { ALL_PRODUCTS, NO_FILTERS, NO_PRODUCTS, NO_REVIEWS, PAGE_SIZE, STATUS_FILTERS } from "./AdminReviews.constants";
import { filterByStatus, matchesReview } from "./AdminReviews.utils";
import { useReviewActions } from "./hooks/useReviewActions";
import { useReviewTable } from "./hooks/useReviewTable";

/**
 * AdminReviews: moderation queue where reviews are approved, rejected or deleted.
 *
 * @returns The reviews page content.
 */
export const AdminReviews = () => {
  const { data, isLoading, reload } = useQuery(listReviews, NO_FILTERS);
  const { data: products } = useQuery(listProducts, ALL_PRODUCTS);
  const [status, setStatus] = useState("");
  const controls = useTableControls(filterByStatus(data ?? NO_REVIEWS, status), { pageSize: PAGE_SIZE, matches: matchesReview });
  const table = useReviewTable(products ?? NO_PRODUCTS, useReviewActions(reload));

  if (isLoading) return <Spinner label="Loading reviews" />;

  return (
    <AdminListView
      title="Reviews"
      description="Approve what shoppers say before it shows on the product page."
      searchLabel="Search reviews"
      filters={<FilterSelect label="Status" options={STATUS_FILTERS} value={status} onChange={setStatus} />}
      controls={controls}
      table={table}
    />
  );
};
