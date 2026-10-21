import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

const options = ["Latest", "Oldest"];

describe("Select", () => {
  it("shows the selected value and keeps the options closed", () => {
    render(<Select value="Latest" options={options} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Latest", expanded: false })).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the listbox and marks the selected option", async () => {
    render(<Select value="Latest" options={options} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Latest" }));
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByRole("option", { name: "Latest", selected: true })).toBeInTheDocument();
  });

  it("reports the picked option and closes", async () => {
    const onChange = vi.fn();
    render(<Select value="Latest" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Latest" }));
    await userEvent.click(screen.getByRole("option", { name: "Oldest" }));
    expect(onChange).toHaveBeenCalledWith("Oldest");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes when the user presses outside", async () => {
    render(<Select value="Latest" options={options} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Latest" }));
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
