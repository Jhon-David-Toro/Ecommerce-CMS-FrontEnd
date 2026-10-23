import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterSelect } from "./FilterSelect";

const options = [
  { value: "", label: "All" },
  { value: "draft", label: "Draft" },
];

describe("FilterSelect", () => {
  it("shows the selected value", () => {
    render(<FilterSelect label="Status" options={options} value="draft" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Status")).toHaveValue("draft");
  });

  it("reports the new value, not the event", async () => {
    const onChange = vi.fn();
    render(<FilterSelect label="Status" options={options} value="" onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText("Status"), "draft");
    expect(onChange).toHaveBeenCalledWith("draft");
  });
});
