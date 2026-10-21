import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SizeSelector from "./SizeSelector";

const sizes = ["S", "M", "L", "XL"];

describe("SizeSelector", () => {
  it("shows the title and one button per size", () => {
    render(<SizeSelector sizes={sizes} selectedSize="M" onSizeChange={vi.fn()} />);
    expect(screen.getByText("Choose Size")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(sizes.length);
  });

  it("marks only the selected size as pressed", () => {
    render(<SizeSelector sizes={sizes} selectedSize="M" onSizeChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "M", pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "S", pressed: false })).toBeInTheDocument();
  });

  it("reports the chosen size", async () => {
    const onSizeChange = vi.fn();
    render(<SizeSelector sizes={sizes} selectedSize="S" onSizeChange={onSizeChange} />);
    await userEvent.click(screen.getByRole("button", { name: "L" }));
    expect(onSizeChange).toHaveBeenCalledWith("L");
  });
});
