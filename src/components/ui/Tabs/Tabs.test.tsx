import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("renders the three tabs", () => {
    render(<Tabs onTabChange={vi.fn()} />);
    expect(screen.getAllByRole("button").map((tab) => tab.textContent)).toEqual(["Product Details", "Rating & Reviews", "FAQs"]);
  });

  it("starts on Rating & Reviews", () => {
    render(<Tabs onTabChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Rating & Reviews", pressed: true })).toBeInTheDocument();
  });

  it("activates the clicked tab and reports it", async () => {
    const onTabChange = vi.fn();
    render(<Tabs onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Product Details" }));
    expect(onTabChange).toHaveBeenCalledWith("Product Details");
    expect(screen.getByRole("button", { name: "Product Details", pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rating & Reviews", pressed: false })).toBeInTheDocument();
  });
});
