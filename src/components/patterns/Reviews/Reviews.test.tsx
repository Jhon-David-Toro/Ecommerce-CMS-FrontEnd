import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Review } from "@/lib/catalog/review.types";
import { Reviews } from "./Reviews";

const reviews: Review[] = [
  { id: "1", author: "Alice", rating: 5, text: "Great!", date: "2024-05-01", verified: true },
  { id: "2", author: "Bob", rating: 4, text: "Good!", date: "2024-04-01", verified: false },
  { id: "3", author: "Charlie", rating: 3, text: "Average!", date: "2024-03-01", verified: true },
  { id: "4", author: "Diana", rating: 5, text: "Excellent!", date: "2024-02-01", verified: true },
  { id: "5", author: "Eve", rating: 2, text: "Not great.", date: "2024-01-01", verified: false },
  { id: "6", author: "Frank", rating: 1, text: "Bad.", date: "2023-12-01", verified: true },
  { id: "7", author: "George", rating: 3, text: "Okay.", date: "2023-11-01", verified: false },
];

const getReviewTexts = () => screen.getAllByText(/^"/).map((quote) => quote.textContent);

describe("Reviews", () => {
  it("shows the total number of reviews", () => {
    render(<Reviews review={reviews} />);
    expect(screen.getByRole("heading", { level: 2, name: /All Reviews/ })).toHaveTextContent("(7)");
  });

  it("renders the first six reviews, newest first", () => {
    render(<Reviews review={reviews} />);
    expect(getReviewTexts()).toEqual(['"Great!"', '"Good!"', '"Average!"', '"Excellent!"', '"Not great."', '"Bad."']);
  });

  it("loads the remaining reviews and hides the button", async () => {
    render(<Reviews review={reviews} />);
    await userEvent.click(screen.getByRole("button", { name: "Load More Reviews" }));
    expect(getReviewTexts()).toHaveLength(7);
    expect(screen.queryByRole("button", { name: "Load More Reviews" })).not.toBeInTheDocument();
  });

  it("does not offer Load More Reviews when everything fits", () => {
    render(<Reviews review={reviews.slice(0, 3)} />);
    expect(screen.queryByRole("button", { name: "Load More Reviews" })).not.toBeInTheDocument();
  });

  it("sorts oldest first when Oldest is selected", async () => {
    render(<Reviews review={reviews} />);
    await userEvent.click(screen.getByRole("button", { name: "Latest" }));
    await userEvent.click(screen.getByRole("option", { name: "Oldest" }));
    expect(getReviewTexts()[0]).toBe('"Okay."');
  });
});
