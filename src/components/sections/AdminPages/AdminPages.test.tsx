import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { getPublishedPage, listPages } from "@/lib/content/content.api";
import type { StaticPage } from "@/lib/content/content.types";

import { AdminPages } from "./AdminPages";
import { toFormValues, toPageInput } from "./AdminPages.utils";

describe("AdminPages", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the pages", async () => {
    render(<AdminPages />);
    expect(await screen.findByRole("cell", { name: "About us" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "/p/about" })).toBeInTheDocument();
  });

  it("requires a title and a text", async () => {
    render(<AdminPages />);
    await userEvent.click(await screen.findByRole("button", { name: "New page" }));
    await userEvent.click(screen.getByRole("button", { name: "Save page" }));
    expect(screen.getAllByRole("alert")).toHaveLength(2);
  });

  it("creates a published page", async () => {
    render(<AdminPages />);
    await userEvent.click(await screen.findByRole("button", { name: "New page" }));
    await userEvent.type(screen.getByLabelText("Title"), "Privacy policy");
    await userEvent.type(screen.getByLabelText("Text"), "We respect your data.");
    await userEvent.click(screen.getByRole("checkbox", { name: "Published" }));
    await userEvent.click(screen.getByRole("button", { name: "Save page" }));
    expect(await screen.findByRole("cell", { name: "/p/privacy-policy" })).toBeInTheDocument();
    expect(await getPublishedPage("privacy-policy")).not.toBeNull();
  });

  it("edits a page", async () => {
    render(<AdminPages />);
    await userEvent.click(await screen.findByRole("button", { name: "Edit About us" }));
    const title = screen.getByLabelText("Title");
    await userEvent.clear(title);
    await userEvent.type(title, "Who we are");
    await userEvent.click(screen.getByRole("button", { name: "Save page" }));
    expect(await screen.findByRole("cell", { name: "Who we are" })).toBeInTheDocument();
  });

  it("deletes a page after confirming", async () => {
    render(<AdminPages />);
    await userEvent.click(await screen.findByRole("button", { name: "Delete About us" }));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    await screen.findByRole("heading", { name: "Pages" });
    expect((await listPages()).some((page) => page.slug === "about")).toBe(false);
  });
});

describe("AdminPages utils", () => {
  const page: StaticPage = { id: 1, title: "About us", slug: "about", body: "Hi", published: true, updatedAt: 1 };

  it("maps a page to form values", () => {
    expect(toFormValues(page)).toEqual({ title: "About us", slug: "about", body: "Hi", published: true });
  });

  it("builds the slug from the title when it is empty", () => {
    expect(toPageInput({ title: "Our Story", slug: "", body: " Text ", published: false }).slug).toBe("our-story");
    expect(toPageInput({ title: "Our Story", slug: "", body: " Text ", published: false }).body).toBe("Text");
  });
});
