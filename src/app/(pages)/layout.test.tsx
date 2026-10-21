import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LayoutBody } from "@/app/(pages)/layout";

describe("LayoutBody", () => {
  it("wraps the page content in the main landmark", () => {
    render(
      <LayoutBody>
        <p>Page content</p>
      </LayoutBody>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page content");
  });

  it("renders the navigation and the footer around the content", () => {
    render(
      <LayoutBody>
        <p>Page content</p>
      </LayoutBody>,
    );
    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
