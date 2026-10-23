import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FOOTER_COLUMNS, PAYMENT_METHODS, SOCIAL_LINKS } from "@/lib/site/footer.constants";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("is exposed as the content info landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the brand and one titled column per group of links", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "SHOP.CO" })).toBeInTheDocument();
    FOOTER_COLUMNS.forEach(({ title }) => expect(screen.getByRole("heading", { name: title })).toBeInTheDocument());
  });

  it("links every default column to a real page of the store", () => {
    FOOTER_COLUMNS.flatMap(({ links }) => links).forEach(({ label, href }) => {
      expect(href).not.toBe("/");
      expect(screen.queryByRole("link", { name: label })).toBeNull();
    });
    render(<Footer />);
    FOOTER_COLUMNS.flatMap(({ links }) => links).forEach(({ label, href }) => {
      expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute("href", href);
    });
  });

  it("links to every social network in a new tab", () => {
    render(<Footer />);
    SOCIAL_LINKS.forEach(({ label, href }) => {
      expect(screen.getByRole("link", { name: `Visit our ${label} page` })).toHaveAttribute("href", href);
    });
  });

  it("lists the accepted payment methods", () => {
    render(<Footer />);
    expect(screen.getByRole("list", { name: "Accepted Payment Methods" })).toBeInTheDocument();
    PAYMENT_METHODS.forEach(({ alt }) => expect(screen.getByRole("img", { name: alt })).toBeInTheDocument());
  });

  it("shows the copyright up to the current year", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`2025-${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
