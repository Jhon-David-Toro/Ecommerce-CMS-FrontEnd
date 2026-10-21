import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminThumb } from "./AdminThumb";

describe("AdminThumb", () => {
  it("shows the first letter when there is no picture", () => {
    render(<AdminThumb src="" name="jeans" />);
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("shows the picture when there is one", () => {
    const { container } = render(<AdminThumb src="https://img.test/a.png" name="jeans" />);
    expect(container.querySelector("img")).toBeInTheDocument();
  });
});
