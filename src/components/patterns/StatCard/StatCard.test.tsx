import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("shows the label and the value", () => {
    render(<StatCard label="Revenue" value="$1,200.00" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$1,200.00")).toBeInTheDocument();
  });

  it("shows the hint when given", () => {
    render(<StatCard label="Orders" value="12" hint="3 pending" />);
    expect(screen.getByText("3 pending")).toBeInTheDocument();
  });
});
