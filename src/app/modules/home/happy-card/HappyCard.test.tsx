import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HappyCard from "./HappyCard";

const props = { name: "Sarah M.", rating: 4, text: "Great quality" };

describe("HappyCard", () => {
  it("shows the customer name and the quoted review", () => {
    render(<HappyCard {...props} />);
    expect(screen.getByText("Sarah M.")).toBeInTheDocument();
    expect(screen.getByText('"Great quality"')).toBeInTheDocument();
  });

  it("shows the numeric rating", () => {
    render(<HappyCard {...props} />);
    expect(screen.getByText(/^4\//)).toBeInTheDocument();
  });
});
