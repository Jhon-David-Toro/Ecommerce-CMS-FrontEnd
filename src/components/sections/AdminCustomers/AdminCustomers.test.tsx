import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { listUsers } from "@/lib/auth/auth.api";

import { AdminCustomers } from "./AdminCustomers";
import { matchesUser } from "./AdminCustomers.utils";

describe("AdminCustomers", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the users and offers no block action for admins", async () => {
    render(<AdminCustomers />);
    expect(await screen.findByRole("cell", { name: "admin@shop.test" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Block Admin/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Block / })).toBeInTheDocument();
  });

  it("blocks and unblocks a customer", async () => {
    render(<AdminCustomers />);
    const block = await screen.findByRole("button", { name: /^Block / });
    await userEvent.click(block);
    expect(await screen.findByRole("button", { name: /^Unblock / })).toBeInTheDocument();
    expect((await listUsers()).some((user) => user.blocked)).toBe(true);
    await userEvent.click(screen.getByRole("button", { name: /^Unblock / }));
    expect(await screen.findByRole("button", { name: /^Block / })).toBeInTheDocument();
  });

  it("searches by email", async () => {
    render(<AdminCustomers />);
    await userEvent.type(await screen.findByRole("searchbox", { name: "Search customers" }), "admin@");
    expect(screen.queryByRole("cell", { name: "customer@shop.test" })).not.toBeInTheDocument();
  });
});

describe("matchesUser", () => {
  it("matches name and email", () => {
    const user = { id: 1, name: "Ana", email: "ana@shop.test", role: "customer", blocked: false, createdAt: 1 } as const;
    expect(matchesUser(user, "ana")).toBe(true);
    expect(matchesUser(user, "@shop")).toBe(true);
    expect(matchesUser(user, "bob")).toBe(false);
  });
});
