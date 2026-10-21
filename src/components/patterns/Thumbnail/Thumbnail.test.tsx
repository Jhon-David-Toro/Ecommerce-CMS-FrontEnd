import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Thumbnail from "./Thumbnail";

const props = { image: "/thumb.png", alt: "Product thumbnail", ariaLabel: "Thumbnail image" };

describe("Thumbnail", () => {
  it("renders a tab with the image and the accessible label", () => {
    render(<Thumbnail {...props} isSelected={false} onSelect={vi.fn()} />);
    expect(screen.getByRole("tab", { name: "Thumbnail image" })).toBeInTheDocument();
    expect(screen.getByAltText("Product thumbnail")).toBeInTheDocument();
  });

  it("is disabled until the image has loaded", () => {
    render(<Thumbnail {...props} isSelected={false} onSelect={vi.fn()} />);
    expect(screen.getByRole("tab")).toBeDisabled();
    fireEvent.load(screen.getByAltText("Product thumbnail"));
    expect(screen.getByRole("tab")).toBeEnabled();
  });

  it("calls onSelect once loaded", async () => {
    const onSelect = vi.fn();
    render(<Thumbnail {...props} isSelected={false} onSelect={onSelect} />);
    fireEvent.load(screen.getByAltText("Product thumbnail"));
    await userEvent.click(screen.getByRole("tab"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("reflects the selected state", () => {
    const { rerender } = render(<Thumbnail {...props} isSelected onSelect={vi.fn()} />);
    expect(screen.getByRole("tab", { selected: true })).toBeInTheDocument();
    rerender(<Thumbnail {...props} isSelected={false} onSelect={vi.fn()} />);
    expect(screen.getByRole("tab", { selected: false })).toBeInTheDocument();
  });
});
