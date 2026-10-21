import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldMessage } from "./FieldMessage";
import { getDescribedBy } from "./FieldMessage.utils";

describe("FieldMessage", () => {
  it("shows the error as an alert, ahead of the hint", () => {
    render(<FieldMessage id="x" error="Required" hint="Help" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.queryByText("Help")).not.toBeInTheDocument();
  });

  it("shows the hint when there is no error", () => {
    render(<FieldMessage id="x" hint="Help" />);
    expect(screen.getByText("Help")).toHaveAttribute("id", "x-hint");
  });

  it("renders nothing without error or hint", () => {
    const { container } = render(<FieldMessage id="x" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("getDescribedBy", () => {
  it("points to the error, then the hint, then nothing", () => {
    expect(getDescribedBy("x", "Bad", "Help")).toBe("x-error");
    expect(getDescribedBy("x", undefined, "Help")).toBe("x-hint");
    expect(getDescribedBy("x")).toBeUndefined();
  });
});
