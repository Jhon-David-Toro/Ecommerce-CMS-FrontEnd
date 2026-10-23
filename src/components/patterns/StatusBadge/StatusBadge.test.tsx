import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("shows the active label", () => {
    render(<StatusBadge active activeLabel="Visible" inactiveLabel="Hidden" />);
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("shows the inactive label", () => {
    render(<StatusBadge active={false} activeLabel="Visible" inactiveLabel="Hidden" />);
    expect(screen.getByText("Hidden")).toBeInTheDocument();
  });
});
