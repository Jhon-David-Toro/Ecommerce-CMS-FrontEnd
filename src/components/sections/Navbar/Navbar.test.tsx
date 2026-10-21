import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import menuData from "@/assets/menu.json";

import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("shows the brand and a link for every main menu entry", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    expect(within(header).getAllByRole("link", { name: "SHOP.COM" }).length).toBeGreaterThan(0);
    menuData.navbar.forEach(({ label }) => expect(within(header).getAllByRole("link", { name: label }).length).toBeGreaterThan(0));
  });

  it("offers a product search box", () => {
    render(<Navbar />);
    expect(screen.getByRole("searchbox", { name: "Search products" })).toBeInTheDocument();
  });

  it("opens and closes the sidebar menu", async () => {
    render(<Navbar />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
