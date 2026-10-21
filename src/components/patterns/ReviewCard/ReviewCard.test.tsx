import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Review } from "@/lib/catalog/review.types";

import { ReviewCard } from "./ReviewCard";

const review: Review = {
  id: "1",
  author: "Jane Doe",
  rating: 4,
  text: "Very nice product!",
  date: "2024-04-10",
  verified: true,
};

const countIcons = (container: HTMLElement) => container.querySelectorAll("svg").length;

describe("ReviewCard", () => {
  it("shows the author, the quoted review and the date", () => {
    render(<ReviewCard review={review} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText('"Very nice product!"')).toBeInTheDocument();
    expect(screen.getByText("Posted on 2024-04-10")).toBeInTheDocument();
  });

  it("adds a verified badge to the five stars", () => {
    const { container } = render(<ReviewCard review={review} />);
    expect(countIcons(container)).toBe(6);
  });

  it("omits the badge for unverified reviews", () => {
    const { container } = render(<ReviewCard review={{ ...review, verified: false }} />);
    expect(countIcons(container)).toBe(5);
  });
});
