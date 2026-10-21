import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyGate } from "./EmptyGate";

const empty = { title: "Nothing yet", actionLabel: "Shop", actionHref: "/products" };

describe("EmptyGate", () => {
  it("shows the empty message when there are no items", () => {
    render(
      <EmptyGate count={0} empty={empty}>
        <p>Items</p>
      </EmptyGate>,
    );
    expect(screen.getByRole("heading", { name: "Nothing yet" })).toBeInTheDocument();
    expect(screen.queryByText("Items")).not.toBeInTheDocument();
  });

  it("shows the content when there are items", () => {
    render(
      <EmptyGate count={2} empty={empty}>
        <p>Items</p>
      </EmptyGate>,
    );
    expect(screen.getByText("Items")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Nothing yet" })).not.toBeInTheDocument();
  });
});
