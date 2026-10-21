import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Rating from "./Rating";

const countStars = (container: HTMLElement) => container.querySelectorAll("svg").length;

describe("Rating", () => {
  it("always draws five stars, counting the half star", () => {
    const { container } = render(<Rating rating={3.5} size="medium" numbers={false} />);
    expect(countStars(container)).toBe(5);
  });

  it("draws five stars for an integer rating", () => {
    const { container } = render(<Rating rating={4} size="medium" numbers={false} />);
    expect(countStars(container)).toBe(5);
  });

  it("shows the numeric rating by default", () => {
    render(<Rating rating={4.2} size="medium" />);
    expect(screen.getByText(/4\.2\//)).toBeInTheDocument();
  });

  it("hides the numeric rating when numbers is false", () => {
    render(<Rating rating={4.2} size="medium" numbers={false} />);
    expect(screen.queryByText(/4\.2\//)).not.toBeInTheDocument();
  });
});
