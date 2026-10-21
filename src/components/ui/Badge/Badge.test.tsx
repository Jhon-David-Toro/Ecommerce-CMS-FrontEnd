import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("shows its text", () => {
    render(<Badge>Shipped</Badge>);
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("accepts every tone", () => {
    render(
      <>
        <Badge tone="success">a</Badge>
        <Badge tone="warning">b</Badge>
        <Badge tone="danger">c</Badge>
        <Badge tone="info">d</Badge>
      </>,
    );
    expect(screen.getAllByText(/[a-d]/)).toHaveLength(4);
  });
});
