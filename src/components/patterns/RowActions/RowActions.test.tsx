import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RowActions } from "./RowActions";

describe("RowActions", () => {
  it("calls the handlers", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<RowActions name="Jeans" onEdit={onEdit} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit Jeans" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete Jeans" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("hides Edit when there is no handler", () => {
    render(<RowActions name="Jeans" onDelete={vi.fn()} />);
    expect(screen.queryByRole("button", { name: "Edit Jeans" })).not.toBeInTheDocument();
  });
});
