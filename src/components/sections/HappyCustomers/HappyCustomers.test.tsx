import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { listLatestReviews } from "@/lib/catalog/reviews.api";

import { HappyCustomers } from "./HappyCustomers";

vi.mock("@/lib/catalog/reviews.api", () => ({ listLatestReviews: vi.fn() }));

const buildReviews = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    productId: 1,
    author: `Customer ${index + 1}`,
    rating: 5,
    text: `Review ${index + 1}`,
    date: "2026-01-01",
    verified: true,
    status: "approved" as const,
  }));

describe("HappyCustomers", () => {
  beforeEach(() => vi.mocked(listLatestReviews).mockResolvedValue(buildReviews(4)));

  it("shows the title and every review of the store", async () => {
    render(<HappyCustomers />);
    expect(await screen.findByText("OUR HAPPY CUSTOMERS")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText(/Customer 1/)).toBeInTheDocument();
  });

  it("stays hidden while there are no reviews", async () => {
    vi.mocked(listLatestReviews).mockResolvedValue([]);
    const { container } = render(<HappyCustomers />);
    await vi.waitFor(() => expect(listLatestReviews).toHaveBeenCalled());
    expect(container).toBeEmptyDOMElement();
  });

  it("moves the slider with the arrow buttons", async () => {
    render(<HappyCustomers />);
    await screen.findByText("OUR HAPPY CUSTOMERS");
    const [previous, next] = screen.getAllByRole("button");
    const track = screen.getByRole("list");
    expect(track.style.getPropertyValue("--slide-offset")).toBe("0%");
    await userEvent.click(next);
    expect(track.style.getPropertyValue("--slide-offset")).not.toBe("0%");
    await userEvent.click(previous);
    expect(track.style.getPropertyValue("--slide-offset")).toBe("0%");
  });
});
