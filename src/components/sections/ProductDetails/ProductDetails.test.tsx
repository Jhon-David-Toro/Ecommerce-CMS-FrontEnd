import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getProduct, productRepository } from "@/lib/catalog/catalog.api";

import { ProductDetails } from "./ProductDetails";

describe("ProductDetails", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ id: "1" });
  });

  it("shows the product name, its gallery and the recommendations section", async () => {
    render(<ProductDetails />);
    expect(await screen.findByRole("heading", { level: 2, name: "One Life Graphic T-Shirt" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "YOU MIGHT ALSO LIKE" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("starts on the reviews tab with the approved reviews", async () => {
    render(<ProductDetails />);
    expect(await screen.findByRole("heading", { name: /all reviews/i })).toBeInTheDocument();
  });

  it("shows the questions of the product on the FAQs tab", async () => {
    render(<ProductDetails />);
    await userEvent.click(await screen.findByRole("button", { name: "FAQs" }));
    const product = (await getProduct(1))!;
    expect(await screen.findByText(product.faqs[0].question)).toBeInTheDocument();
  });

  it("says when the product does not exist", async () => {
    vi.mocked(useParams).mockReturnValue({ id: "9999" });
    render(<ProductDetails />);
    expect(await screen.findByRole("heading", { name: "Product not found" })).toBeInTheDocument();
  });

  it("hides unpublished products", async () => {
    await productRepository.update(1, { status: "draft" });
    render(<ProductDetails />);
    expect(await screen.findByRole("heading", { name: "Product not found" })).toBeInTheDocument();
  });
});
