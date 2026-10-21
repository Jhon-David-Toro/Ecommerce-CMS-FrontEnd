import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import StatsCounter from "./StatsCounter";

describe("StatsCounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the label and starts at zero", () => {
    render(<StatsCounter endValue={1000} label="Active users" />);
    expect(screen.getByText("Active users")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("0+");
  });

  it("counts up to the end value", () => {
    render(<StatsCounter endValue={2000} label="Products" duration={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("2,000+");
  });

  it("keeps several counters independent", () => {
    render(
      <>
        <StatsCounter endValue={200} label="Brands" duration={1000} />
        <StatsCounter endValue={30000} label="Customers" duration={1000} />
      </>,
    );
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const [brands, customers] = screen.getAllByRole("heading", { level: 3 });
    expect(brands).toHaveTextContent("200+");
    expect(customers).toHaveTextContent("30,000+");
  });
});
