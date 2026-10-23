import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { NO_FILTER_OPTIONS } from "@/lib/catalog/filters/filters.constants";
import type { FilterOptions } from "@/lib/catalog/filters/filters.types";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import { Filters } from "./Filters";

const options: FilterOptions = {
  categories: ["Hoodie", "Jeans"],
  priceBounds: [20, 180],
  colors: [{ hex: "#f00", name: "Red" }],
  sizes: ["Small", "Large"],
  dressStyles: ["Casual"],
};

describe("Filters", () => {
  beforeEach(() => useFilterStore.getState().resetFilters());

  it("offers only what the catalog has", () => {
    render(<Filters options={options} />);
    expect(screen.getByRole("checkbox", { name: "Hoodie" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "T-Shirts" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Red" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Small" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "XX-Small" })).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Casual" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Gym" })).not.toBeInTheDocument();
  });

  it("starts the price range at the prices of the catalog", () => {
    render(<Filters options={options} />);
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByText("$180")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Minimum price" })).toHaveAttribute("min", "20");
    expect(screen.getByRole("slider", { name: "Maximum price" })).toHaveAttribute("max", "180");
  });

  it("hides every filter that has nothing to choose from", () => {
    render(<Filters options={NO_FILTER_OPTIONS} />);
    ["Categories", "Price", "Colors", "Size", "Dress Style"].forEach((title) =>
      expect(screen.queryByRole("button", { name: title })).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Reset filter" })).toBeInTheDocument();
  });

  it("selects an option in the filter store", async () => {
    render(<Filters options={options} />);
    await userEvent.click(screen.getByRole("button", { name: "Small" }));
    expect(useFilterStore.getState().sizes).toEqual(["Small"]);
  });
});
