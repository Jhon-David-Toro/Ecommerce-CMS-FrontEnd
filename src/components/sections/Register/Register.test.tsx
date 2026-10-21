import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter, useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { Register } from "./Register";
import { validateRegister } from "./Register.utils";

const fill = async (name: string, email: string, password: string, confirm: string) => {
  await userEvent.type(screen.getByLabelText("Full name"), name);
  await userEvent.type(screen.getByLabelText("Email"), email);
  await userEvent.type(screen.getByLabelText("Password"), password);
  await userEvent.type(screen.getByLabelText("Confirm password"), confirm);
  await userEvent.click(screen.getByRole("button", { name: "Create account" }));
};

describe("Register", () => {
  const replace = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    replace.mockClear();
    useAuthStore.setState({ user: null, isReady: true });
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), replace, back: vi.fn(), refresh: vi.fn() } as never);
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
  });

  it("creates the account and opens the account page", async () => {
    render(<Register />);
    await fill("Ana Gomez", "ana@mail.test", "secret1", "secret1");
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/account"));
    expect(useAuthStore.getState().user?.email).toBe("ana@mail.test");
  });

  it("flags passwords that do not match", async () => {
    render(<Register />);
    await fill("Ana", "ana@mail.test", "secret1", "other");
    expect(await screen.findByText("The passwords do not match.")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("explains that the email is already registered", async () => {
    render(<Register />);
    await fill("Ana", "admin@shop.test", "secret1", "secret1");
    expect(await screen.findByText("An account with this email already exists.")).toBeInTheDocument();
  });
});

describe("validateRegister", () => {
  it("requires every field and a long enough password", () => {
    const errors = validateRegister({ name: "", email: "x", password: "123", confirm: "" });
    expect(Object.keys(errors).sort()).toEqual(["confirm", "email", "name", "password"]);
  });
});
