import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { createReview, listReviews } from "@/lib/catalog/reviews.api";
import { buildProduct, buildReview } from "@/test/factories";

import { AdminReviews } from "./AdminReviews";
import { filterByStatus, getProductName, matchesReview } from "./AdminReviews.utils";

/**
 * Stores a pending review that is easy to find in the table.
 */
const addPendingReview = async () => {
  const { id, ...review } = buildReview({ author: "Pending Pat", text: "Waiting for approval", status: "pending", productId: 1 });
  void id;
  await createReview(review);
};

describe("AdminReviews", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists reviews with the name of their product", async () => {
    await addPendingReview();
    render(<AdminReviews />);
    expect(await screen.findByRole("cell", { name: "Pending Pat" })).toBeInTheDocument();
    expect(screen.getAllByText("One Life Graphic T-Shirt").length).toBeGreaterThan(0);
  });

  it("approves a pending review", async () => {
    await addPendingReview();
    render(<AdminReviews />);
    await userEvent.click(await screen.findByRole("button", { name: "Approve review by Pending Pat" }));
    await screen.findByRole("cell", { name: "Pending Pat" });
    expect((await listReviews({ status: "pending" })).some((review) => review.author === "Pending Pat")).toBe(false);
  });

  it("rejects and deletes a review", async () => {
    await addPendingReview();
    render(<AdminReviews />);
    await userEvent.click(await screen.findByRole("button", { name: "Reject review by Pending Pat" }));
    expect((await listReviews({ status: "rejected" })).some((review) => review.author === "Pending Pat")).toBe(true);
    await userEvent.click(await screen.findByRole("button", { name: "Delete review by Pending Pat" }));
    await screen.findByRole("heading", { name: "Reviews" });
    expect((await listReviews()).some((review) => review.author === "Pending Pat")).toBe(false);
  });

  it("filters by status", async () => {
    await addPendingReview();
    render(<AdminReviews />);
    await userEvent.click(await screen.findByRole("button", { name: "Approved" }));
    expect(screen.queryByRole("cell", { name: "Pending Pat" })).not.toBeInTheDocument();
  });
});

describe("AdminReviews utils", () => {
  it("matches author and text", () => {
    const review = buildReview({ author: "Jane", text: "Lovely" });
    expect(matchesReview(review, "jan")).toBe(true);
    expect(matchesReview(review, "love")).toBe(true);
    expect(matchesReview(review, "xyz")).toBe(false);
  });

  it("filters by status", () => {
    const reviews = [buildReview(), buildReview({ id: 2, status: "pending" })];
    expect(filterByStatus(reviews, "pending")).toHaveLength(1);
    expect(filterByStatus(reviews, "")).toHaveLength(2);
  });

  it("names the product or falls back to its id", () => {
    expect(getProductName([buildProduct({ id: 5, name: "Hoodie" })], 5)).toBe("Hoodie");
    expect(getProductName([], 9)).toBe("Product #9");
  });
});
