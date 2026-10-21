import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { AuthGate } from "./AuthGate";
import { buildLoginHref } from "./AuthGate.utils";

const signInAs = (role: "admin" | "customer") =>
  useAuthStore.setState({
    isReady: true,
    user: { id: 1, name: "Ana", email: "ana@mail.test", role, blocked: false, createdAt: 1 },
  });

describe("AuthGate", () => {
  const replace = vi.fn();

  beforeEach(() => {
    replace.mockClear();
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), replace, back: vi.fn(), refresh: vi.fn() } as never);
    vi.mocked(usePathname).mockReturnValue("/account");
    useAuthStore.setState({ user: null, isReady: true });
  });

  it("sends visitors to sign in and remembers the page", async () => {
    render(
      <AuthGate>
        <p>Secret</p>
      </AuthGate>,
    );
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login?next=%2Faccount"));
    expect(screen.queryByText("Secret")).not.toBeInTheDocument();
  });

  it("shows the content to a signed-in user", () => {
    signInAs("customer");
    render(
      <AuthGate>
        <p>Secret</p>
      </AuthGate>,
    );
    expect(screen.getByText("Secret")).toBeInTheDocument();
  });

  it("denies access when the role does not match", () => {
    signInAs("customer");
    render(
      <AuthGate role="admin">
        <p>Admin only</p>
      </AuthGate>,
    );
    expect(screen.getByRole("heading", { name: "Access denied" })).toBeInTheDocument();
    expect(screen.queryByText("Admin only")).not.toBeInTheDocument();
  });

  it("lets the matching role through", () => {
    signInAs("admin");
    render(
      <AuthGate role="admin">
        <p>Admin only</p>
      </AuthGate>,
    );
    expect(screen.getByText("Admin only")).toBeInTheDocument();
  });

  it("builds the sign in address", () => {
    expect(buildLoginHref("/admin/orders")).toBe("/login?next=%2Fadmin%2Forders");
  });
});
