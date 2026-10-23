import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { buildReviewQuery, createReview, deleteReview, listReviews, setReviewStatus } from "./reviews.remote";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const admin = { id: 1, name: "Admin", email: "a@shop.test", role: "admin" as const, blocked: false, createdAt: 1 };

describe("reviews against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, [])));
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({ user: null, isReady: true });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("builds the query of the admin list", () => {
    expect(buildReviewQuery({})).toBe("");
    expect(buildReviewQuery({ productId: 3, status: "pending" })).toBe("?productId=3&status=pending");
  });

  it("shows shoppers only the approved reviews of a product", async () => {
    await listReviews({ productId: 4, status: "approved" });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/catalog/4/reviews");
    expect(await listReviews()).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("lets administrators filter every review", async () => {
    useAuthStore.setState({ user: admin });
    await listReviews({ status: "pending" });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/admin/reviews?status=pending");
  });

  it("sends only the rating and the text, because the author is the session", async () => {
    await createReview({ productId: 4, author: "Ana", rating: 5, text: "Great", date: "x", verified: false, status: "pending" });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/products/4/reviews");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ rating: 5, text: "Great" });
  });

  it("moderates and deletes reviews", async () => {
    await setReviewStatus(9, "rejected");
    fetchMock.mockImplementation(() => Promise.resolve(answer(204)));
    await deleteReview(9);
    expect(fetchMock.mock.calls[0]).toEqual(["/api/admin/reviews/9/status", expect.objectContaining({ method: "PATCH" })]);
    expect(fetchMock.mock.calls[1]).toEqual(["/api/admin/reviews/9", expect.objectContaining({ method: "DELETE" })]);
  });
});
