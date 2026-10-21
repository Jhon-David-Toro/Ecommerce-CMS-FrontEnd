import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AuthLayout } from "./AuthLayout";
import type { AuthLayoutForm } from "./AuthLayout.types";

/**
 * Builds the form state that the layout needs.
 *
 * @param overrides Fields to change.
 * @returns The form state.
 */
const buildForm = (overrides: Partial<AuthLayoutForm> = {}): AuthLayoutForm => ({
  failure: "",
  isSubmitting: false,
  handleSubmit: vi.fn((event) => event.preventDefault()),
  ...overrides,
});

const renderLayout = (form: AuthLayoutForm) =>
  render(
    <AuthLayout
      headline="Clothes that fit."
      bullets={["Track orders"]}
      title="Welcome back"
      subtitle="Sign in."
      form={form}
      submitLabel="Sign in"
      pendingLabel="Signing in..."
      footer={<a href="/register">Create an account</a>}
    >
      <input aria-label="Email" />
    </AuthLayout>,
  );

describe("AuthLayout", () => {
  it("shows the title, the fields and the link to the other page", () => {
    renderLayout(buildForm());
    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account" })).toBeInTheDocument();
  });

  it("submits the form", async () => {
    const form = buildForm();
    renderLayout(form);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(form.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows the failure", () => {
    renderLayout(buildForm({ failure: "Wrong password" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Wrong password");
  });

  it("disables the button while sending", () => {
    renderLayout(buildForm({ isSubmitting: true }));
    expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled();
  });
});
