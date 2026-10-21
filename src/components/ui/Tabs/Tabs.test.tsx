import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./Tabs";

const tabs = ["Details", "Reviews", "FAQs"];

describe("Tabs", () => {
  it("renders one button per tab", () => {
    render(<Tabs tabs={tabs} initialTab="Reviews" onTabChange={vi.fn()} />);
    expect(screen.getAllByRole("button").map((tab) => tab.textContent)).toEqual(tabs);
  });

  it("starts on the initial tab", () => {
    render(<Tabs tabs={tabs} initialTab="Reviews" onTabChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Reviews", pressed: true })).toBeInTheDocument();
  });

  it("activates the clicked tab and reports it", async () => {
    const onTabChange = vi.fn();
    render(<Tabs tabs={tabs} initialTab="Reviews" onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Details" }));
    expect(onTabChange).toHaveBeenCalledWith("Details");
    expect(screen.getByRole("button", { name: "Details", pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reviews", pressed: false })).toBeInTheDocument();
  });
});
