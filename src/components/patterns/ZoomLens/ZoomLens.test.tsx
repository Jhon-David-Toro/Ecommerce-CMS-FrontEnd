import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ZoomLens } from "./ZoomLens";

const mockLensPosition = {
  x: 100,
  y: 150,
};

describe(ZoomLens.name, () => {
  it("should render the ZoomLens component with the correct styles", () => {
    render(<ZoomLens lensPosition={mockLensPosition} />);

    const zoomLensDiv = screen.getByRole("presentation");
    expect(zoomLensDiv).toBeInTheDocument();

    expect(zoomLensDiv).toHaveStyle(`left: ${mockLensPosition.x}px`);
    expect(zoomLensDiv).toHaveStyle(`top: ${mockLensPosition.y}px`);
  });
});
