import { describe, expect, it } from "vitest";

import { buildReview } from "@/test/factories";

import { sortReviews } from "./Reviews.utils";

const build = (id: number, date: string) => buildReview({ id, date: `${date}T00:00:00.000Z` });
const reviews = [build(1, "2024-01-01"), build(2, "2024-05-01"), build(3, "2024-03-01")];

describe("sortReviews", () => {
  it("puts the newest first for Latest", () => {
    expect(sortReviews(reviews, "Latest").map((review) => review.id)).toEqual([2, 3, 1]);
  });

  it("puts the oldest first for Oldest", () => {
    expect(sortReviews(reviews, "Oldest").map((review) => review.id)).toEqual([1, 3, 2]);
  });

  it("does not change the original list", () => {
    sortReviews(reviews, "Latest");
    expect(reviews.map((review) => review.id)).toEqual([1, 2, 3]);
  });
});
