import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { pageRepository } from "@/lib/content/content.api";

import { StaticPage } from "./StaticPage";

describe("StaticPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(useParams).mockReturnValue({ slug: "about" });
  });

  it("shows the title and a paragraph for every block of text", async () => {
    render(<StaticPage />);
    expect(await screen.findByRole("heading", { level: 1, name: "ABOUT US" })).toBeInTheDocument();
    expect(screen.getAllByText(/./, { selector: "p" }).length).toBeGreaterThanOrEqual(2);
  });

  it("says when the page does not exist or is a draft", async () => {
    await pageRepository.update(1, { published: false });
    render(<StaticPage />);
    expect(await screen.findByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});
