import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import mockProduct from "../../../assets/mockProduct.json";
import ProductDetails from "./ProductDetails";

const responses: Record<string, unknown> = {
  "/data/products.json": { newArrivals: [], topSelling: [] },
  "/data/reviews.json": [],
  "/data/faqs.json": [{ id: "1", question: "How do I wash it?", answer: "Machine wash cold." }],
};

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => Promise.resolve({ json: () => Promise.resolve(responses[url]) })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the product name and the recommendations section", async () => {
    render(<ProductDetails />);
    expect(screen.getByRole("heading", { level: 2, name: mockProduct.name })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "YOU MIGHT ALSO LIKE" })).toBeInTheDocument();
  });

  it("starts on the reviews tab", async () => {
    render(<ProductDetails />);
    expect(await screen.findByRole("heading", { name: /all reviews/i })).toBeInTheDocument();
  });

  it("switches to the FAQs tab", async () => {
    render(<ProductDetails />);
    await userEvent.click(screen.getByRole("button", { name: "FAQs" }));
    expect(await screen.findByText("How do I wash it?")).toBeInTheDocument();
  });
});
