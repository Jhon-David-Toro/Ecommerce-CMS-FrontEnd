import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
  it("renders a button with the given text and type attribute", () => {
    render(<Button type="primary" size="medium" text="Click me" typeAttribute="submit" />);
    expect(screen.getByRole("button", { name: "Click me" })).toHaveAttribute("type", "submit");
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<Button type="primary" size="medium" text="Click me" typeAttribute="button" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<Button type="primary" size="medium" text="Click me" typeAttribute="button" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a link when href is given", () => {
    render(<Button type="primary" size="medium" text="Shop" typeAttribute="button" href="/products" />);
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/products");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("exposes the pressed state", () => {
    render(<Button type="tertiary" size="small" text="M" typeAttribute="button" ariaPressed />);
    expect(screen.getByRole("button", { name: "M", pressed: true })).toBeInTheDocument();
  });
});
