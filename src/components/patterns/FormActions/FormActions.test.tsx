import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FormActions } from "./FormActions";

describe("FormActions", () => {
  it("shows the save label and a submit button", () => {
    render(<FormActions submitLabel="Save page" onCancel={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Save page" })).toHaveAttribute("type", "submit");
  });

  it("calls onCancel", async () => {
    const onCancel = vi.fn();
    render(<FormActions submitLabel="Save" onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
