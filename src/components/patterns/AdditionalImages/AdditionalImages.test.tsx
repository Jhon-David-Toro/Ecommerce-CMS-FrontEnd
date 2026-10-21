import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AdditionalImages } from "./AdditionalImages";

const mainImage = "/main.jpg";
const additionalImages = ["/image1.jpg", "/image2.jpg"];

const renderThumbnails = (setCurrentMainImage = vi.fn()) => {
  render(
    <AdditionalImages
      currentMainImage={mainImage}
      mainImage={mainImage}
      setCurrentMainImage={setCurrentMainImage}
      additionalImages={additionalImages}
    />,
  );
  screen.getAllByRole("img").forEach((image) => fireEvent.load(image));
  return setCurrentMainImage;
};

describe("AdditionalImages", () => {
  it("renders the main image and the additional images as tabs", () => {
    renderThumbnails();
    expect(screen.getByRole("tablist", { name: "Thumbnail images" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("selects the thumbnail of the current main image", () => {
    renderThumbnails();
    expect(screen.getByRole("tab", { name: "Select main product image", selected: true })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Select thumbnail 1 of the product", selected: false })).toBeInTheDocument();
  });

  it("changes the main image when a thumbnail is clicked", async () => {
    const setCurrentMainImage = renderThumbnails();
    await userEvent.click(screen.getByRole("tab", { name: "Select thumbnail 1 of the product" }));
    expect(setCurrentMainImage).toHaveBeenCalledWith("/image1.jpg");
  });
});
