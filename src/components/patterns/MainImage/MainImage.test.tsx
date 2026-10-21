import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MainImage from "./MainImage";

const ZOOMED_IMAGE = "Enlarged image of the product";

const renderImage = (isMobile: boolean) => {
  render(<MainImage currentMainImage="/test-image.jpg" isMobile={isMobile} />);
  return screen.getByRole("region", { name: "Main product image with zoom" });
};

describe("MainImage", () => {
  it("renders the main product image", () => {
    renderImage(false);
    expect(screen.getByAltText("Main product image")).toBeInTheDocument();
  });

  it("shows the zoomed image while the mouse moves over it on desktop", () => {
    const region = renderImage(false);
    fireEvent.mouseMove(region, { clientX: 100, clientY: 100 });
    expect(screen.getByAltText(ZOOMED_IMAGE)).toBeInTheDocument();
  });

  it("removes the zoom when the mouse leaves", () => {
    const region = renderImage(false);
    fireEvent.mouseMove(region, { clientX: 100, clientY: 100 });
    fireEvent.mouseLeave(region);
    expect(screen.queryByAltText(ZOOMED_IMAGE)).not.toBeInTheDocument();
  });

  it("ignores mouse movement on mobile", () => {
    const region = renderImage(true);
    fireEvent.mouseMove(region, { clientX: 100, clientY: 100 });
    expect(screen.queryByAltText(ZOOMED_IMAGE)).not.toBeInTheDocument();
  });

  it("zooms on touch and stops when the touch ends", () => {
    const region = renderImage(true);
    fireEvent.touchStart(region, { touches: [{ clientX: 100, clientY: 100 }] });
    expect(screen.getByAltText(ZOOMED_IMAGE)).toBeInTheDocument();
    fireEvent.touchEnd(region);
    expect(screen.queryByAltText(ZOOMED_IMAGE)).not.toBeInTheDocument();
  });
});
