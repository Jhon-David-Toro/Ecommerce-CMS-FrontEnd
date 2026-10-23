import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RecordGate } from "./RecordGate";

const notFound = { title: "Thing not found", description: "It is gone.", backLabel: "Back to things", backHref: "/things" };

describe("RecordGate", () => {
  it("shows a spinner while loading", () => {
    render(
      <RecordGate record={null} isLoading loadingLabel="Loading thing" notFound={notFound}>
        {() => <p>Content</p>}
      </RecordGate>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading thing");
  });

  it("shows the not found message with a link back", () => {
    render(
      <RecordGate record={null} isLoading={false} loadingLabel="Loading thing" notFound={notFound}>
        {() => <p>Content</p>}
      </RecordGate>,
    );
    expect(screen.getByText("Thing not found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to things" })).toHaveAttribute("href", "/things");
  });

  it("draws the content from the record", () => {
    render(
      <RecordGate record={{ name: "Lamp" }} isLoading={false} loadingLabel="Loading thing" notFound={notFound}>
        {(thing) => <p>{thing.name}</p>}
      </RecordGate>,
    );
    expect(screen.getByText("Lamp")).toBeInTheDocument();
  });
});
