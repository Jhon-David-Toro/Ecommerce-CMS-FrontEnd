import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("links the label to the input", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("forwards native attributes and events", async () => {
    const onChange = vi.fn();
    render(<Input label="Name" placeholder="Your name" onChange={onChange} />);
    await userEvent.type(screen.getByPlaceholderText("Your name"), "Ana");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("shows the hint", () => {
    render(<Input label="Name" hint="As on your ID" />);
    expect(screen.getByLabelText("Name")).toHaveAccessibleDescription("As on your ID");
  });

  it("shows the error and marks the field invalid", () => {
    render(<Input label="Name" error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.getByLabelText("Name")).toBeInvalid();
  });
});
