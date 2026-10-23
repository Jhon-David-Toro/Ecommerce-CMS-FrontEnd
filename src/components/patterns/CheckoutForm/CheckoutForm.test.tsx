import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CheckoutForm } from "./CheckoutForm";
import { buildInitialValues, validateCheckout } from "./CheckoutForm.utils";

const fillAddress = async () => {
  await userEvent.type(screen.getByLabelText("Phone"), "555 1234");
  await userEvent.type(screen.getByLabelText("Full name"), "Ana Gomez");
  await userEvent.type(screen.getByLabelText("Street address"), "12 Main St");
  await userEvent.type(screen.getByLabelText("City"), "Lima");
  await userEvent.type(screen.getByLabelText("Postal code"), "15001");
  await userEvent.type(screen.getByLabelText("Country"), "Peru");
};

describe("CheckoutForm", () => {
  it("prefills the email", () => {
    render(<CheckoutForm defaultEmail="ana@mail.test" isSubmitting={false} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Email")).toHaveValue("ana@mail.test");
  });

  it("asks for the missing required fields and does not submit", async () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm defaultEmail="" isSubmitting={false} onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Place order" }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(6);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the values with the payment method", async () => {
    const onSubmit = vi.fn();
    render(<CheckoutForm defaultEmail="ana@mail.test" isSubmitting={false} onSubmit={onSubmit} />);
    await fillAddress();
    await userEvent.click(screen.getByRole("radio", { name: /Bank transfer/ }));
    await userEvent.click(screen.getByRole("button", { name: "Place order" }));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: "Ana Gomez", paymentMethod: "bank_transfer", country: "Peru" }),
    );
  });

  it("disables the button while placing the order and shows errors", () => {
    render(<CheckoutForm defaultEmail="" error="Could not place the order." isSubmitting onSubmit={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Placing order..." })).toBeDisabled();
    expect(screen.getByText("Could not place the order.")).toBeInTheDocument();
  });
});

describe("checkout utils", () => {
  it("builds initial values and validates them", () => {
    expect(buildInitialValues("a@b.co").email).toBe("a@b.co");
    expect(Object.keys(validateCheckout(buildInitialValues("")))).toContain("fullName");
  });
});
