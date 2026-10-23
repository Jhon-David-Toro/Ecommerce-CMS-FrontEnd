import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("links the label to the textarea", () => {
    render(<TextArea label="Notes" />);
    expect(screen.getByRole("textbox", { name: "Notes" })).toBeInTheDocument();
  });

  it("forwards events", async () => {
    const onChange = vi.fn();
    render(<TextArea label="Notes" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hi");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("shows the error instead of the hint", () => {
    render(<TextArea label="Notes" hint="Optional" error="Too long" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Too long");
    expect(screen.queryByText("Optional")).not.toBeInTheDocument();
  });
});
