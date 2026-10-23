import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("is found by its label", () => {
    render(<Checkbox label="Published" />);
    expect(screen.getByRole("checkbox", { name: "Published" })).not.toBeChecked();
  });

  it("reports changes", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Published" onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("can start checked", () => {
    render(<Checkbox label="Published" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
