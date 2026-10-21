import { describe, expect, it } from "vitest";

import type { Review } from "@/lib/catalog/review.types";

import { sortReviews } from "./Reviews.utils";

const build = (id: string, date: string): Review => ({ id, author: "A", rating: 5, text: "T", date, verified: true });
const reviews = [build("old", "2024-01-01"), build("new", "2024-05-01"), build("mid", "2024-03-01")];

describe("sortReviews", () => {
  it("puts the newest first for Latest", () => {
    expect(sortReviews(reviews, "Latest").map((review) => review.id)).toEqual(["new", "mid", "old"]);
  });

  it("puts the oldest first for Oldest", () => {
    expect(sortReviews(reviews, "Oldest").map((review) => review.id)).toEqual(["old", "mid", "new"]);
  });

  it("does not change the original list", () => {
    sortReviews(reviews, "Latest");
    expect(reviews.map((review) => review.id)).toEqual(["old", "new", "mid"]);
  });
});
