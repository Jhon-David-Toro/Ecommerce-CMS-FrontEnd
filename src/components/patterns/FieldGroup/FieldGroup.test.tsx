import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldGroup } from "./FieldGroup";
import { FieldRow } from "./FieldRow";

describe("FieldGroup", () => {
  it("names the group after its legend and shows its fields", () => {
    render(
      <FieldGroup legend="Basics">
        <input aria-label="Name" />
      </FieldGroup>,
    );
    expect(screen.getByRole("group", { name: "Basics" })).toContainElement(screen.getByLabelText("Name"));
  });
});

describe("FieldRow", () => {
  it("shows its children", () => {
    render(
      <FieldRow>
        <input aria-label="Price" />
        <input aria-label="Stock" />
      </FieldRow>,
    );
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock")).toBeInTheDocument();
  });
});
