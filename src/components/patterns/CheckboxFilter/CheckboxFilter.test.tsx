import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CheckboxFilter } from "./CheckboxFilter";

const options = ["Casual", "Formal", "Party"];

describe("CheckboxFilter", () => {
  it("shows the title and one checkbox per option", () => {
    render(<CheckboxFilter title="Dress Style" options={options} selected={[]} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Dress Style/ })).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  it("checks only the selected options", () => {
    render(<CheckboxFilter title="Dress Style" options={options} selected={["Formal"]} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox", { name: "Formal" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Casual" })).not.toBeChecked();
  });

  it("adds an option to the selection", async () => {
    const onChange = vi.fn();
    render(<CheckboxFilter title="Dress Style" options={options} selected={["Formal"]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Party" }));
    expect(onChange).toHaveBeenCalledWith(["Formal", "Party"]);
  });

  it("removes an option from the selection", async () => {
    const onChange = vi.fn();
    render(<CheckboxFilter title="Dress Style" options={options} selected={["Formal"]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Formal" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("hides the options when the section is collapsed", async () => {
    render(<CheckboxFilter title="Dress Style" options={options} selected={[]} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: /Dress Style/ }));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
