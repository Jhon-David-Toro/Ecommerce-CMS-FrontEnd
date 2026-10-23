import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ActionButton } from "./ActionButton";

describe("ActionButton", () => {
  it("shows the label and calls onClick", async () => {
    const onClick = vi.fn();
    render(<ActionButton label="Block" tone="danger" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Block" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
