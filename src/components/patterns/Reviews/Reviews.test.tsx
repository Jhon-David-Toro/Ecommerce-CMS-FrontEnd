import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { buildReview } from "@/test/factories";

import { Reviews } from "./Reviews";

const dates = ["2024-05-01", "2024-04-01", "2024-03-01", "2024-02-01", "2024-01-01", "2023-12-01", "2023-11-01"];
const texts = ["Great!", "Good!", "Average!", "Excellent!", "Not great.", "Bad.", "Okay."];
const reviews = texts.map((text, index) => buildReview({ id: index + 1, text, date: `${dates[index]}T00:00:00.000Z` }));

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
