import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectColor } from "./SelectColor";

const colors = [
  { name: "Red", hex: "#ff0000" },
  { name: "Green", hex: "#00ff00" },
  { name: "Blue", hex: "#0000ff" },
];

describe("SelectColor", () => {
  it("shows the title and one button per color", () => {
    render(<SelectColor colors={colors} selectedColor="Green" onColorChange={vi.fn()} />);
    expect(screen.getByText("Select Colors")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(colors.length);
  });

  it("marks only the selected color as pressed", () => {
    render(<SelectColor colors={colors} selectedColor="Green" onColorChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Green", pressed: true })).toHaveStyle({ backgroundColor: "#00ff00" });
    expect(screen.getByRole("button", { name: "Red", pressed: false })).toBeInTheDocument();
  });

  it("reports the chosen color", async () => {
    const onColorChange = vi.fn();
    render(<SelectColor colors={colors} selectedColor="Red" onColorChange={onColorChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Green" }));
    expect(onColorChange).toHaveBeenCalledWith("Green");
  });
});
