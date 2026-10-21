import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { AdminShell } from "./AdminShell";
import { ADMIN_NAV } from "./AdminShell.constants";
import { isActiveLink } from "./AdminShell.utils";

describe("AdminShell", () => {
  const replace = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    replace.mockClear();
    vi.mocked(usePathname).mockReturnValue("/admin/products/new");
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn(), replace, back: vi.fn(), refresh: vi.fn() } as never);
    useAuthStore.setState({
      isReady: true,
      user: { id: 1, name: "Store Admin", email: "admin@shop.test", role: "admin", blocked: false, createdAt: 1 },
    });
  });

  it("shows the page content and the signed-in admin", () => {
    render(
      <AdminShell>
        <p>Page body</p>
      </AdminShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page body");
    expect(screen.getByText("Store Admin")).toBeInTheDocument();
  });

  it("links to every section and marks the current one", () => {
    render(<AdminShell>content</AdminShell>);
    const nav = screen.getByRole("navigation", { name: "Admin" });
    expect(nav.querySelectorAll("a")).toHaveLength(ADMIN_NAV.length);
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute("aria-current");
  });

  it("links back to the store", () => {
    render(<AdminShell>content</AdminShell>);
    expect(screen.getByRole("link", { name: "View store" })).toHaveAttribute("href", "/");
  });

  it("signs out and goes to the sign in page", async () => {
    render(<AdminShell>content</AdminShell>);
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(useAuthStore.getState().user).toBeNull();
    expect(replace).toHaveBeenCalledWith("/login");
  });
});

describe("isActiveLink", () => {
  it("matches the dashboard only exactly", () => {
    expect(isActiveLink("/admin", { label: "D", href: "/admin", exact: true })).toBe(true);
    expect(isActiveLink("/admin/orders", { label: "D", href: "/admin", exact: true })).toBe(false);
  });

  it("matches nested paths of a section", () => {
    expect(isActiveLink("/admin/orders/3", { label: "O", href: "/admin/orders" })).toBe(true);
    expect(isActiveLink("/admin/ordersX", { label: "O", href: "/admin/orders" })).toBe(false);
  });
});
