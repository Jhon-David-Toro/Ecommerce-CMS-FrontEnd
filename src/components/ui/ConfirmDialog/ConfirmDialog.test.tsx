import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ConfirmDialog } from "./ConfirmDialog";

const props = { title: "Delete product?", message: "This cannot be undone.", onConfirm: vi.fn(), onCancel: vi.fn() };

describe("ConfirmDialog", () => {
  it("renders nothing while closed", () => {
    render(<ConfirmDialog {...props} open={false} />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("shows the question when open", () => {
    render(<ConfirmDialog {...props} open />);
    expect(screen.getByRole("alertdialog", { name: "Delete product?" })).toHaveAccessibleDescription("This cannot be undone.");
  });

  it("confirms and cancels", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<ConfirmDialog {...props} open onConfirm={onConfirm} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("cancels on Escape", async () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...props} open onCancel={onCancel} />);
    await userEvent.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
