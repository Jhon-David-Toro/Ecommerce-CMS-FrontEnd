"use client";

import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Pagination } from "@/components/patterns/Pagination";
import { TableToolbar } from "@/components/patterns/TableToolbar";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { SelectInput } from "@/components/ui/SelectInput";
import { Spinner } from "@/components/ui/Spinner";
import { listProducts } from "@/lib/catalog/catalog.api";
import type { ReviewStatus } from "@/lib/catalog/review.types";
import { deleteReview, listReviews, setReviewStatus } from "@/lib/catalog/reviews.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { ALL_PRODUCTS, NO_FILTERS, PAGE_SIZE, REVIEW_TONES, STATUS_FILTERS } from "./AdminReviews.constants";
import { filterByStatus, getProductName, matchesReview } from "./AdminReviews.utils";

/**
 * AdminReviews: moderation queue where reviews are approved, rejected or deleted.
 *
 * @returns The reviews page content.
 */
export const AdminReviews = () => {
  const { data, isLoading, reload } = useQuery(listReviews, NO_FILTERS);
  const { data: products } = useQuery(listProducts, ALL_PRODUCTS);
  const [status, setStatus] = useState("");
  const rows = filterByStatus(data ?? [], status);
  const { query, setQuery, page, setPage, totalPages, pageRows } = useTableControls(rows, { pageSize: PAGE_SIZE, matches: matchesReview });

  /**
   * Moves a review to another moderation status and refreshes the list.
   *
   * @param id Review id.
   * @param next New status.
   */
  const moderate = async (id: number, next: ReviewStatus) => {
    await setReviewStatus(id, next);
    reload();
  };

  /**
   * Deletes a review and refreshes the list.
   *
   * @param id Review id.
   */
  const remove = async (id: number) => {
    await deleteReview(id);
    reload();
  };

  if (isLoading) return <Spinner label="Loading reviews" />;

  return (
    <>
      <PageHeader title="Reviews" description="Approve what shoppers say before it shows on the product page." />
      <TableToolbar query={query} onQueryChange={setQuery} placeholder="Search reviews">
        <SelectInput label="Status" options={STATUS_FILTERS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </TableToolbar>
      <DataTable
        caption="Reviews"
        emptyTitle="No reviews found"
        rows={pageRows}
        getRowKey={(review) => review.id}
        columns={[
          { key: "product", header: "Product", render: (review) => getProductName(products ?? [], review.productId) },
          { key: "author", header: "Author", render: (review) => review.author },
          { key: "rating", header: "Rating", render: (review) => <Rating rating={review.rating} size="small" /> },
          { key: "text", header: "Review", render: (review) => review.text },
          { key: "status", header: "Status", render: (review) => <Badge tone={REVIEW_TONES[review.status]}>{review.status}</Badge> },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (review) => (
              <>
                <button type="button" onClick={() => moderate(review.id, "approved")} aria-label={`Approve review by ${review.author}`}>
                  Approve
                </button>{" "}
                <button type="button" onClick={() => moderate(review.id, "rejected")} aria-label={`Reject review by ${review.author}`}>
                  Reject
                </button>{" "}
                <button type="button" onClick={() => remove(review.id)} aria-label={`Delete review by ${review.author}`}>
                  Delete
                </button>
              </>
            ),
          },
        ]}
      />
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
};
