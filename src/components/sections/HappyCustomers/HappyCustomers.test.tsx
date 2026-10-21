import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HappyCustomers } from "./HappyCustomers";

describe("HappyCustomers", () => {
  it("shows the title and every review", () => {
    render(<HappyCustomers />);
    expect(screen.getByText("OUR HAPPY CUSTOMERS")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("moves the slider with the arrow buttons", async () => {
    render(<HappyCustomers />);
    const [previous, next] = screen.getAllByRole("button");
    const track = screen.getByRole("list");
    expect(track.style.getPropertyValue("--slide-offset")).toBe("0%");
    await userEvent.click(next);
    expect(track.style.getPropertyValue("--slide-offset")).not.toBe("0%");
    await userEvent.click(previous);
    expect(track.style.getPropertyValue("--slide-offset")).toBe("0%");
  });
});
