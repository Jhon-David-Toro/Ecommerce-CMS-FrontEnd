import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { Login } from "./Login";
import { validateLogin } from "./Login.utils";

describe("Login", () => {
  const replace = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    replace.mockClear();
    useAuthStore.setState({ user: null, isReady: true });
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), replace, back: vi.fn(), refresh: vi.fn() } as never);
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
  });

  it("asks for the missing fields", async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(replace).not.toHaveBeenCalled();
  });

  it("shows the error when the credentials are wrong", async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText("Email"), "admin@shop.test");
    await userEvent.type(screen.getByLabelText("Password"), "wrong");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByText("Incorrect email or password.")).toBeInTheDocument();
  });

  it("sends an admin to the admin panel", async () => {
    render(<Login />);
    await userEvent.type(screen.getByLabelText("Email"), "admin@shop.test");
    await userEvent.type(screen.getByLabelText("Password"), "admin123");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/admin"));
  });

  it("returns a customer to the page they came from", async () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("next=/checkout") as never);
    render(<Login />);
    await userEvent.type(screen.getByLabelText("Email"), "customer@shop.test");
    await userEvent.type(screen.getByLabelText("Password"), "customer123");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/checkout"));
  });

  it("links to the registration page", () => {
    render(<Login />);
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/register");
  });
});

describe("validateLogin", () => {
  it("accepts a filled form and flags a bad email", () => {
    expect(validateLogin({ email: "a@b.co", password: "x" })).toEqual({});
    expect(validateLogin({ email: "nope", password: "x" })).toEqual({ email: "Enter a valid email address." });
  });
});
