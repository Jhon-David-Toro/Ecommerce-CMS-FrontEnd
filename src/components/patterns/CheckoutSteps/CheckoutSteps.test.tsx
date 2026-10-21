import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CheckoutSteps } from "./CheckoutSteps";
import { getStepState } from "./CheckoutSteps.utils";

describe("CheckoutSteps", () => {
  it("lists the three stages and marks the current one", () => {
    render(<CheckoutSteps current={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Your details").closest("li")).toHaveAttribute("aria-current", "step");
  });

  it("marks every stage as done after the last one", () => {
    render(<CheckoutSteps current={4} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem").every((item) => !item.hasAttribute("aria-current"))).toBe(true);
  });
});

describe("getStepState", () => {
  it("is done before, active on and todo after the current stage", () => {
    expect(getStepState(1, 2)).toBe("done");
    expect(getStepState(2, 2)).toBe("active");
    expect(getStepState(3, 2)).toBe("todo");
  });
});
