import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SliderButton } from "./SliderButton";

describe("SliderButton", () => {
  it.each(["left", "right"] as const)("is labelled with its %s direction", (direction) => {
    render(<SliderButton direction={direction} onClick={vi.fn()} disabled={false} />);
    expect(screen.getByRole("button", { name: `Slide ${direction}` })).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<SliderButton direction="right" onClick={onClick} disabled={false} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when requested", () => {
    render(<SliderButton direction="left" onClick={vi.fn()} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
