import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectInput } from "./SelectInput";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

describe("SelectInput", () => {
  it("lists the options under a label", () => {
    render(<SelectInput label="Letter" options={options} />);
    expect(screen.getByRole("combobox", { name: "Letter" })).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("reports the chosen option", async () => {
    const onChange = vi.fn();
    render(<SelectInput label="Letter" options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "b");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("shows an error", () => {
    render(<SelectInput label="Letter" options={options} error="Pick one" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Pick one");
  });
});
