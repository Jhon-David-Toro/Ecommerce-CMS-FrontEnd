import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ProductImages } from "./ProductImages";

const mainImage = "/main.jpg";
const additionalImages = ["/1.jpg", "/2.jpg"];

describe("ProductImages", () => {
  it("shows the main image with one thumbnail per image", () => {
    render(<ProductImages mainImage={mainImage} additionalImages={additionalImages} />);
    expect(screen.getByRole("region", { name: "Product images" })).toBeInTheDocument();
    expect(screen.getByAltText("Main product image")).toHaveAttribute("src", mainImage);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("swaps the main image when a thumbnail is chosen", async () => {
    render(<ProductImages mainImage={mainImage} additionalImages={additionalImages} />);
    fireEvent.load(screen.getByAltText("Miniature 1 of the product"));
    await userEvent.click(screen.getByRole("tab", { name: "Select thumbnail 1 of the product" }));
    expect(screen.getByAltText("Main product image")).toHaveAttribute("src", "/1.jpg");
  });
});
