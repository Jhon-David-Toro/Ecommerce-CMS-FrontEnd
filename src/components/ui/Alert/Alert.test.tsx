import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("announces errors as alerts", () => {
    render(<Alert>Something failed</Alert>);
    expect(screen.getByRole("alert")).toHaveTextContent("Something failed");
  });

  it("announces other tones as status", () => {
    render(<Alert tone="success">Saved</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });
});
