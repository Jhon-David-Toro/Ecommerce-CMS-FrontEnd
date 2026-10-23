import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { getContent } from "@/lib/content/content.api";
import { DEFAULT_CONTENT } from "@/lib/content/content.constants";

import { AdminContent } from "./AdminContent";
import {
  formatColumns,
  formatLinks,
  formatStats,
  parseColumns,
  parseLinks,
  parseMenu,
  parseStats,
  toContent,
  toFormValues,
  validateContent,
} from "./AdminContent.utils";

describe("AdminContent", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the current content", async () => {
    render(<AdminContent />);
    expect(await screen.findByLabelText("Headline")).toHaveValue(DEFAULT_CONTENT.hero.title);
    expect(screen.getByRole("checkbox", { name: "Show the banner" })).toBeChecked();
  });

  it("saves the changes so the store can read them", async () => {
    render(<AdminContent />);
    const headline = await screen.findByLabelText("Headline");
    await userEvent.clear(headline);
    await userEvent.type(headline, "Summer is here");
    await userEvent.click(screen.getByRole("checkbox", { name: "Show the banner" }));
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(await screen.findByText(/Changes saved/)).toBeInTheDocument();
    const saved = await getContent();
    expect(saved.hero.title).toBe("Summer is here");
    expect(saved.banner.enabled).toBe(false);
  });

  it("does not save invalid menus", async () => {
    render(<AdminContent />);
    const menu = await screen.findByLabelText("Top bar links");
    await userEvent.clear(menu);
    await userEvent.type(menu, "Broken line");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByText("Use one Label | address per line.")).toBeInTheDocument();
    expect((await getContent()).navbar).toEqual(DEFAULT_CONTENT.navbar);
  });

  it("restores the original content", async () => {
    render(<AdminContent />);
    const headline = await screen.findByLabelText("Headline");
    await userEvent.clear(headline);
    await userEvent.type(headline, "Temporary");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    await screen.findByText(/Changes saved/);
    await userEvent.click(screen.getByRole("button", { name: "Restore original" }));
    expect(await screen.findByText("Original content restored.")).toBeInTheDocument();
    expect(screen.getByLabelText("Headline")).toHaveValue(DEFAULT_CONTENT.hero.title);
    expect((await getContent()).hero.title).toBe(DEFAULT_CONTENT.hero.title);
  });
});

describe("AdminContent utils", () => {
  it("round-trips links, stats and footer columns", () => {
    expect(parseLinks(formatLinks(DEFAULT_CONTENT.footerColumns[0].links))).toEqual(DEFAULT_CONTENT.footerColumns[0].links);
    expect(parseStats(formatStats(DEFAULT_CONTENT.stats))).toEqual(DEFAULT_CONTENT.stats);
    expect(parseColumns(formatColumns(DEFAULT_CONTENT.footerColumns))).toEqual(DEFAULT_CONTENT.footerColumns);
  });

  it("skips lines that are not understood", () => {
    expect(parseMenu("Shop | /products\nbroken")).toEqual([{ label: "Shop", href: "/products" }]);
    expect(parseStats("10 | Things\nabc | Nope\n0 | Zero")).toEqual([{ endValue: 10, label: "Things" }]);
    expect(parseColumns("Shop | /shop\n# Help\nFAQ | /faq")).toEqual([{ title: "Help", links: [{ label: "FAQ", href: "/faq" }] }]);
  });

  it("converts content to form values and back", () => {
    expect(toContent(toFormValues(DEFAULT_CONTENT))).toEqual(DEFAULT_CONTENT);
  });

  it("validates the form", () => {
    const valid = toFormValues(DEFAULT_CONTENT);
    expect(validateContent(valid)).toEqual({});
    const errors = validateContent({ ...valid, heroTitle: "", stats: "oops", footerColumns: "orphan | /x", bannerText: "" });
    expect(Object.keys(errors).sort()).toEqual(["bannerText", "footerColumns", "heroTitle", "stats"]);
  });

  it("requires the banner text only while the banner is shown", () => {
    const hidden = { ...toFormValues(DEFAULT_CONTENT), bannerEnabled: false, bannerText: "" };
    expect(validateContent(hidden)).toEqual({});
    expect(validateContent({ ...hidden, bannerEnabled: true })).toHaveProperty("bannerText");
  });
});
