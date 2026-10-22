import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { AdminShell } from "./AdminShell";
import { ADMIN_NAV, ADMIN_NAV_GROUPS } from "./AdminShell.constants";
import { buildSearchHref, isActiveLink } from "./AdminShell.utils";

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

  it("groups the links under titles", () => {
    render(<AdminShell>content</AdminShell>);
    for (const group of ADMIN_NAV_GROUPS) expect(screen.getByText(group.title)).toBeInTheDocument();
  });

  it("collapses the sidebar and remembers it", async () => {
    render(<AdminShell>content</AdminShell>);
    await userEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();
    expect(window.localStorage.getItem("shop.adminSidebar")).toBe("true");
  });

  it("opens and closes the menu drawer", async () => {
    render(<AdminShell>content</AdminShell>);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(screen.getByRole("button", { name: "Dismiss menu" }));
    expect(screen.queryByRole("button", { name: "Dismiss menu" })).not.toBeInTheDocument();
  });

  it("links back to the store", () => {
    render(<AdminShell>content</AdminShell>);
    expect(screen.getByRole("link", { name: "Visit store" })).toHaveAttribute("href", "/");
  });

  it("searches the products from the top bar", async () => {
    const push = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push, replace, back: vi.fn(), refresh: vi.fn() } as never);
    render(<AdminShell>content</AdminShell>);
    await userEvent.type(screen.getByRole("searchbox", { name: "Search products" }), "shirt{Enter}");
    expect(push).toHaveBeenCalledWith("/admin/products?q=shirt");
  });

  it("signs out and goes to the sign in page", async () => {
    render(<AdminShell>content</AdminShell>);
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(useAuthStore.getState().user).toBeNull();
    expect(replace).toHaveBeenCalledWith("/login");
  });
});

describe("buildSearchHref", () => {
  it("opens the product list with the text", () => {
    expect(buildSearchHref(" red shirt ")).toBe("/admin/products?q=red%20shirt");
    expect(buildSearchHref("  ")).toBe("/admin/products");
  });
});

describe("isActiveLink", () => {
  it("matches the dashboard only exactly", () => {
    expect(isActiveLink("/admin", { href: "/admin", exact: true })).toBe(true);
    expect(isActiveLink("/admin/orders", { href: "/admin", exact: true })).toBe(false);
  });

  it("matches nested paths of a section", () => {
    expect(isActiveLink("/admin/orders/3", { href: "/admin/orders" })).toBe(true);
    expect(isActiveLink("/admin/ordersX", { href: "/admin/orders" })).toBe(false);
  });
});
