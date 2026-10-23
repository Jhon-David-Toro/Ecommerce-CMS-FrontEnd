import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PromoCodeForm } from "./PromoCodeForm";

describe("PromoCodeForm", () => {
  it("sends the typed code when applied", async () => {
    const onApply = vi.fn();
    render(<PromoCodeForm appliedCode="" discountPercent={0} onApply={onApply} />);
    await userEvent.type(screen.getByRole("textbox", { name: "Promo code" }), " SHOP20 ");
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(onApply).toHaveBeenCalledWith("SHOP20");
  });

  it("confirms a valid code", () => {
    render(<PromoCodeForm appliedCode="SHOP20" discountPercent={20} onApply={vi.fn()} />);
    expect(screen.getByText("20% discount applied.")).toBeInTheDocument();
  });

  it("warns about an invalid code", () => {
    render(<PromoCodeForm appliedCode="NOPE" discountPercent={0} onApply={vi.fn()} />);
    expect(screen.getByRole("alert")).toHaveTextContent("not valid");
  });
});
