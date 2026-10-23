import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ChipFilter } from "./ChipFilter";

const options = [
  { value: "all", label: "All 3" },
  { value: "done", label: "Delivered 1" },
];

describe("ChipFilter", () => {
  it("marks the selected chip", () => {
    render(<ChipFilter label="Status" options={options} value="done" onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Delivered 1" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All 3" })).toHaveAttribute("aria-pressed", "false");
  });

  it("reports the picked value", async () => {
    const onChange = vi.fn();
    render(<ChipFilter label="Status" options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Delivered 1" }));
    expect(onChange).toHaveBeenCalledWith("done");
  });
});
