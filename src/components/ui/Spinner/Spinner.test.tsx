import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces loading as a status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Loading orders" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading orders");
  });

  it("has an inline size for buttons and text", () => {
    render(<Spinner size="inline" label="Saving" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
  });
});
