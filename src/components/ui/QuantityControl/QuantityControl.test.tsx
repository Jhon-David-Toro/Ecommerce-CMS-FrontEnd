import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuantityControl } from "./QuantityControl";

describe(QuantityControl.name, () => {
  it("renders with the initial quantity", () => {
    const setQuantity = vi.fn();
    render(<QuantityControl quantity={2} onQuantityChange={setQuantity} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it('increments the quantity when "+" button is clicked', () => {
    const setQuantity = vi.fn();
    render(<QuantityControl quantity={2} onQuantityChange={setQuantity} />);
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);
    expect(setQuantity).toHaveBeenCalledWith(3);
  });

  it('decrements the quantity when "−" button is clicked', () => {
    const setQuantity = vi.fn();
    render(<QuantityControl quantity={2} onQuantityChange={setQuantity} />);
    const decrementButton = screen.getByText("−");
    fireEvent.click(decrementButton);
    expect(setQuantity).toHaveBeenCalledWith(1);
  });

  it("does not decrement below 1", () => {
    const setQuantity = vi.fn();
    render(<QuantityControl quantity={1} onQuantityChange={setQuantity} />);
    const decrementButton = screen.getByText("−");
    fireEvent.click(decrementButton);
    expect(setQuantity).toHaveBeenCalledWith(1);
  });
});
